"use client";
import { useQuery } from "@apollo/client/react";
import React, { use } from "react";
import { GET_MOVIE } from "../../graphql/Query";
import { Carousel, Tag, Spin, Typography, Space, Flex, Breadcrumb } from "antd";
import { StarFilled } from "@ant-design/icons";
import Image from "next/image";
import { Images, Language, Movie } from "@/__generated__/graphql";
import dayjs from "dayjs";
import Portal from "@/components/Portal";

const { Title, Text, Paragraph } = Typography;

const MovieDetailsPage = ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const { movieId } = use(params);

  const { data, loading } = useQuery(GET_MOVIE, {
    variables: { id: movieId },
  });

  if (loading) {
    return (
      <Flex justify="center" align="center" className="loading-container">
        <Spin size="large" />
      </Flex>
    );
  }

  const movie = { ...data?.movie?.data } as Movie;

  if (!movie) {
    return (
      <Flex justify="center" align="center" className="loading-container">
        <Text>Movie not found</Text>
      </Flex>
    );
  }

  const images = movie.movieImages || [];
  const fallbackImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==";
  const carouselImages = images.length > 0 ? images : [{ filePath: fallbackImage }];

  return (
    <div className="movie-details-container">
      <Portal portalId="breadcrumbs">
        <Breadcrumb
          items={[
            { title: "Movies", href: "/movies-card", },
            {
              title: movie?.title,
            },
          ]}
        />
      </Portal>
      <Title>{movie?.title}</Title>

      <Carousel autoplay autoplaySpeed={3000}>
        {carouselImages.map((img, index) => (
          <div key={index}>
            <div className="movie-carousel-image-container">
              <Image
                src={img?.filePath || fallbackImage}
                alt={`${movie.title} - ${index + 1}`}
                fill
                className="object-fit-cover"
              />
            </div>
          </div>
        ))}
      </Carousel>

      <div className="margin-top-24">
        <Space size="large">
          <Space>
            <StarFilled style={{ color: "#fadb14" }} />
            <Text strong>{movie.voteAverage?.toFixed(1) || 0}/10</Text>
          </Space>
          <Text type="secondary">
            {movie.voteCount?.toLocaleString() || 0} votes
          </Text>
          <Text type="secondary">
            Popularity: {movie.popularity?.toFixed(0) || 0}
          </Text>
        </Space>

        {movie?.tagline && (
          <Paragraph italic className="margin-top-16">
            &quot;{movie.tagline}&quot;
          </Paragraph>
        )}

        <div className="margin-top-16">
          <Title level={4}>Overview</Title>
          <Paragraph>{movie?.overview || "No overview available."}</Paragraph>
        </div>

        {movie?.genres && movie.genres.length > 0 && (
          <div className="margin-top-16">
            <Title level={4}>Genres</Title>
            <Space wrap>
              {movie?.genres?.map((genre) => (
                <Tag key={genre?.id} color="blue">
                  {genre?.name}
                </Tag>
              ))}
            </Space>
          </div>
        )}

        <div className="margin-top-16">
          <Title level={4}>Details</Title>
          <Space orientation="vertical">
            <Text>
              <strong>Release Date:</strong>{" "}
              {dayjs(movie.releaseDate).format("MM/DD/YYYY") || "N/A"}
            </Text>
            <Text>
              <strong>Runtime:</strong>{" "}
              {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
            </Text>
            <Text>
              <strong>Budget:</strong>{" "}
              {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
            </Text>
            <Text>
              <strong>Revenue:</strong>{" "}
              {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
            </Text>
            <Text>
              <strong>Status:</strong> {movie.status || "N/A"}
            </Text>
            <Text>
              <strong>Language:</strong>{" "}
              {movie.originalLanguage?.toUpperCase() || "N/A"}
            </Text>
          </Space>
        </div>

        {movie.languages && movie.languages.length > 0 && (
          <div className="margin-top-16">
            <Title level={4}>Languages</Title>
            <Space wrap>
              {movie.languages.map((lang, index) => (
                <Tag key={index}>{lang?.englishName}</Tag>
              ))}
            </Space>
          </div>
        )}

        {movie.countries && movie.countries.length > 0 && (
          <div className="margin-top-16">
            <Title level={4}>Countries</Title>
            <Space wrap>
              {movie?.countries?.map((country, index) => (
                <Tag key={index} color="green">
                  {country?.englishName}
                </Tag>
              ))}
            </Space>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
