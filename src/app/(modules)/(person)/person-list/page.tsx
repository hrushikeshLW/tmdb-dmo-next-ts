"use client";
import {
  Breadcrumb,
  Button,
  Card,
  Flex,
  Input,
  Popconfirm,
  PopconfirmProps,
  Space,
  Table,
  TablePaginationConfig,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { GET_PERSONS } from "./graphql/Query";
import {
  ListPersonsSortFields,
  Person,
  SortOrder,
} from "@/__generated__/graphql";
import { capitalize, debounce } from "lodash";
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { ColumnsType } from "antd/es/table";
import { DELETE_PERSON } from "./graphql/Mutation";
import Portal from "@/components/Portal";

const PersonList = () => {
  const [personList, setPersonList] = useState<Person[]>([]);
  const [skip, setSkip] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [getPersons, { data, loading }] = useLazyQuery(GET_PERSONS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.listPersons?.data) {
      const validPersons = (data.listPersons.data || []) as Person[];
      setPersonList(validPersons);
    }
  }, [data]);

  useEffect(() => {
    getPersons({
      variables: {
        filter: { skip, limit: 10, searchTerm },
        sort: { order: SortOrder.Desc, field: ListPersonsSortFields.UpdatedAt },
      },
    });
  }, []);

  const [deletePerson] = useMutation(DELETE_PERSON, {
    onCompleted: () => {
      getPersons({
        variables: {
          filter: { skip, limit: 10, searchTerm },
          sort: {
            order: SortOrder.Desc,
            field: ListPersonsSortFields.UpdatedAt,
          },
        },
      });
    },
  });

  const confirm = (e: React.MouseEvent<HTMLElement> | undefined, id: string) => {
    e?.stopPropagation();
    deletePerson({
      variables: {
        id,
      },
    });
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    e?.stopPropagation();
  };

  const columns: ColumnsType<Person> = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (_, record, i: number) => <div>{skip + i + 1}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <div>{text}</div>,
    },
    {
      title: "Known As",
      dataIndex: "alsoKnownAs",
      key: "alsoKnownAs",
      render: (text: string) => <div>{text || "-"}</div>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text: string) => <div>{capitalize(text)}</div>,
    },
    {
      title: "Known For Department",
      dataIndex: "knownForDepartment",
      key: "knownForDepartment",
      render: (text: string) => <div>{text || "-"}</div>,
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (text: string) => (
        <div>{text ? dayjs(text).format("MM/DD/YYYY") : "-"}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: Person) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/person-list/${record?.id}/edit`);
            }}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Delete Person"
            description="Are you sure to delete this person?"
            onConfirm={(e) => {
              if (record?.id) {
                confirm(e, record?.id);
              }
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              shape="circle"
              onClick={(e) => e.stopPropagation()}
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 10 } = pagination;
    const skipPage = (current - 1) * pageSize;
    setSkip(skipPage);
    getPersons({
      variables: {
        filter: { skip: skipPage, limit: 10, searchTerm },
        sort: { order: SortOrder.Desc, field: ListPersonsSortFields.UpdatedAt },
      },
    });
  };

  const fetchPersons = (value: string) => {
    setSkip(0);
    getPersons({
      variables: {
        filter: { skip: 0, limit: 10, searchTerm: value },
        sort: { order: SortOrder.Desc, field: ListPersonsSortFields.UpdatedAt },
      },
    });
  };

  const debouncedSearch = useMemo(
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    () =>
      debounce((value: string) => {
        setPersonList([]);
        fetchPersons(value);
      }, 500),
    [],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <>
      <Portal portalId="breadcrumbs">
        <Breadcrumb items={[{ title: "Person" }]} />
      </Portal>
      <Card>
        <Flex
          gap="10px"
          className="margin-bottom-10"
          align="center"
          justify="space-between"
        >
          <Title level={3}>Person List</Title>
          <Flex>
            <Input
              className="person-list-input-search"
              placeholder="Search person..."
              value={searchTerm}
              onChange={handleSearch}
              allowClear
            />
            <Button
              type="primary"
              onClick={() => router.push("/person-list/create")}
            >
              Add Person
            </Button>
          </Flex>
        </Flex>
        <div className="cursor-pointer">
          <Table
            bordered
            columns={columns}
            dataSource={personList as Person[]}
            loading={loading}
            rowKey={(obj) => obj?.id || ""}
            onChange={handleTableChange}
            onRow={(record) => {
              return {
                onClick: () => router.push(`/person-list/${record?.id}`),
              };
            }}
            pagination={{
              showSizeChanger: false,
              total: data?.listPersons?.count || 0,
            }}
          />
        </div>
      </Card>
    </>
  );
};

export default PersonList;
