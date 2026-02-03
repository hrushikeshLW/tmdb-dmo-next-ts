"use client";

import { useLazyQuery, useMutation } from "@apollo/client/react";
import {
  ListMoviesSortFields,
  Movie,
  SortOrder,
} from "@/__generated__/graphql";
import Image from "next/image";
import {
  Breadcrumb,
  Button,
  Card,
  Flex,
  Input,
  Popconfirm,
  PopconfirmProps,
  Select,
  Spin,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { map, debounce } from "lodash";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { LIST_MOVIES } from "../graphql/Query";
import { DELETE_MOVIE } from "../graphql/Mutation";
import Portal from "@/components/Portal";

const { Meta } = Card;
export default function MovieCard() {
  const router = useRouter();
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({
    order: SortOrder.Desc,
    field: ListMoviesSortFields.UpdatedAt,
  });
  const [getMoviesList, { data, loading }] = useLazyQuery(LIST_MOVIES, {
    fetchPolicy: "network-only",
  });

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    onCompleted: () => {
      getMoviesList({
        variables: {
          filter: { skip: 0, limit: 10, searchTerm },
          sort,
        },
      });
    },
  });

  useEffect(() => {
    getMoviesList({
      variables: {
        filter: { skip: 0, limit: 10, searchTerm },
        sort,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?.movies?.data?.length) {
      setMovieList((prev) => [...prev, ...(data?.movies?.data as Movie[])]);
      setHasMore(!(data?.movies?.data?.length < 10));
    } else {
      setHasMore(false);
    }
  }, [data]);

  useEffect(() => {
    setMovieList([]);
    getMoviesList({
      variables: {
        filter: {
          skip: 0,
          limit: 10,
          searchTerm,
        },
        sort,
      },
    });
  }, [sort]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, offsetHeight } = target || {};
    const scrolledToBottom = scrollTop + offsetHeight >= scrollHeight - 10;
    if (scrolledToBottom && hasMore && !loading) {
      getMoviesList({
        variables: {
          filter: {
            skip: movieList.length,
            limit: 10,
            searchTerm,
          },
          sort,
        },
      });
    }
  };

  const fetchMovies = (value: string) => {
    getMoviesList({
      variables: {
        filter: {
          searchTerm: value,
          skip: 0,
          limit: 10,
        },
        sort,
      },
    });
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setMovieList([]);
        fetchMovies(value);
      }, 500),
    [],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleConfirm: PopconfirmProps["onConfirm"] = (e, id: string) => {
    console.log("first");
    e?.stopPropagation();
    deleteMovie({
      variables: {
        id,
      },
    });
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    e?.stopPropagation();
  };

  return (
    <>
      <Portal portalId="breadcrumbs">
        <Breadcrumb items={[{ title: "Movies" }]} />
      </Portal>
      <h2>Movies Card</h2>
      <Flex
        gap="10px"
        style={{ marginBottom: "10px" }}
        align="center"
        justify="end"
      >
        <Select
          options={map(
            Object.values(ListMoviesSortFields),
            (item: ListMoviesSortFields) => {
              return {
                label: item.toUpperCase(),
                value: item,
              };
            },
          )}
          onChange={(value: ListMoviesSortFields) => {
            setSort((prev) => ({ ...prev, field: value }));
          }}
          style={{ width: 150 }}
          placeholder="Sort Field"
        />
        <Select
          options={map(Object.values(SortOrder), (item: SortOrder) => {
            return {
              label: item.toUpperCase(),
              value: item,
            };
          })}
          onChange={(value: SortOrder) => {
            setSort((prev) => ({ ...prev, order: value }));
          }}
          style={{ width: 150 }}
          placeholder="Sort Order"
        />
        <Input
          style={{ maxWidth: 250 }}
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearch}
          allowClear
        />
        <Button
          type="primary"
          onClick={() => router.push("/movies-card/create")}
        >
          Add Movie
        </Button>
      </Flex>
      <div
        style={{ height: "700px", overflowY: "auto" }}
        onScroll={handleScroll}
      >
        <Flex wrap="wrap" gap="20px">
          {movieList?.map((movie) => (
            <Card
              key={movie?.id}
              style={{
                marginBottom: "16px",
                cursor: "pointer",
                maxWidth: 300,
              }}
              actions={[
                <Button key="edit" shape="square">
                  <EditOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/movies-card/${movie?.id}/edit`);
                    }}
                  />
                </Button>,
                <Popconfirm
                  key="delete"
                  title="Delete Person"
                  description="Are you sure to delete this person?"
                  onConfirm={(e) => {
                    e.stopPropagation();
                    handleConfirm(record?.id);
                  }}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    danger
                    shape="square"
                  >
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>,
              ]}
              onClick={() => router.push(`/movies-card/${movie?.id}`)}
              cover={
                <Image
                  src={
                    movie?.imageUrl ||
                    "data:image/png;base64,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"
                  }
                  height={300}
                  width={400}
                  alt={movie?.title || ""}
                  className="movie-card-image"
                />
              }
            >
              <Meta
                title={movie?.title}
                description={<p className="line-clamp-1">{movie?.overview}</p>}
              />
            </Card>
          ))}
        </Flex>
        <Flex justify="center" align="center">
          {loading && <Spin spinning />}
        </Flex>
      </div>
    </>
  );
}
