"use client";
import {
  Button,
  Card,
  Flex,
  Input,
  Space,
  Table,
  TablePaginationConfig,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client/react";
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

const PersonList = () => {
  const [personList, setPersonList] = useState<Person | []>([]);
  const [skip, setSkip] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [getPersons, { data, loading }] = useLazyQuery(GET_PERSONS, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.listPersons?.data) {
      setPersonList(data?.listPersons?.data);
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
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (text: string) => (
        <div>{dayjs(text).format("MM/DD/YYYY") || "-"}</div>
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
            onClick={() => {
              router.push(`/person-list/${record?.id}/edit`);
            }}
          >
            <EditOutlined />
          </Button>
          <Button type="primary" danger shape="circle">
            <DeleteOutlined />
          </Button>
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
      <Card>
        <Flex
          gap="10px"
          style={{ marginBottom: "10px" }}
          align="center"
          justify="space-between"
        >
          <Title level={3}>Person List</Title>
          <Flex>
            <Input
              style={{ maxWidth: 250, marginRight: "10px" }}
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
        <Table
          bordered
          columns={columns}
          dataSource={personList as Person[]}
          loading={loading}
          rowKey={(obj) => obj?.id || ""}
          onChange={handleTableChange}
          pagination={{
            showSizeChanger: false,
            total: data?.listPersons?.count || 0,
          }}
        />
      </Card>
    </>
  );
};

export default PersonList;
