"use client";
import React, { use } from "react";
import { useQuery } from "@apollo/client/react";
import {
  Descriptions,
  Spin,
  Typography,
  Tag,
  Space,
  Flex,
  Card,
  Button,
  Breadcrumb,
} from "antd";
import type { DescriptionsProps } from "antd";
import Image from "next/image";
import dayjs from "dayjs";
import { Person } from "@/__generated__/graphql";
import { GET_PERSON } from "../graphql/Query";
import { EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Portal from "@/components/Portal";

const { Title, Paragraph, Text } = Typography;

const fallbackImage =
  "data:image/png;base64,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";

const genderLabel = (gender: Person["gender"]) => {
  switch (gender) {
    case "MALE":
      return "Male";
    case "FEMALE":
      return "Female";
    case "OTHER":
      return "Other";
    default:
      return "N/A";
  }
};

const PersonDetails = ({
  params,
}: {
  params: Promise<{ personId: string }>;
}) => {
  const { personId } = use(params);
  const router = useRouter();
  const { data, loading } = useQuery(GET_PERSON, {
    variables: { id: personId },
  });

  if (loading) {
    return (
      <Flex justify="center" align="center" className="person-details-wrapper">
        <Spin size="large" />
      </Flex>
    );
  }

  const person = { ...data?.person?.data } as Person;

  if (!person?.id) {
    return (
      <Flex justify="center" align="center" className="person-details-wrapper">
        <Text>Person not found</Text>
      </Flex>
    );
  }

  const items: DescriptionsProps["items"] = [
    {
      key: "tmdbId",
      label: "TMDB ID",
      children: person.tmdbId || "N/A",
    },
    {
      key: "knownForDepartment",
      label: "Known For",
      children: person.knownForDepartment || "N/A",
    },
    {
      key: "gender",
      label: "Gender",
      children: genderLabel(person.gender),
    },
    {
      key: "birthday",
      label: "Birthday",
      children: person.birthday
        ? dayjs(person.birthday).format("MM/DD/YYYY")
        : "N/A",
    },
    {
      key: "deathday",
      label: "Deathday",
      children: person.deathday
        ? dayjs(person.deathday).format("MM/DD/YYYY")
        : "N/A",
    },
    {
      key: "placeOfBirth",
      label: "Place of Birth",
      children: person.placeOfBirth || "N/A",
    },
    {
      key: "popularity",
      label: "Popularity",
      children: person.popularity?.toFixed(2) || "N/A",
    },
    {
      key: "adult",
      label: "Adult",
      children: person.adult ? "Yes" : "No",
    },
    {
      key: "homePage",
      label: "Home Page",
      children: person.homePage ? (
        <a href={person.homePage} target="_blank" rel="noopener noreferrer">
          {person.homePage}
        </a>
      ) : (
        "N/A"
      ),
    },
  ];

  return (
    <Card className="person-details-wrapper" loading={loading}>
      <Portal portalId="breadcrumbs">
        <Breadcrumb
          items={[
            { title: "Person", href: "/person-list" },
            { title: person.name },
          ]}
        />
      </Portal>
      <div className="person-details-header">
        {
          <Image
            className="person-profile-image"
            src={fallbackImage}
            alt={person.name || "Profile"}
            width={240}
            height={240}
          />
        }
        <div className="person-details-header-text width-percent-100">
          <Flex justify="space-between" align="center">
            <Title>{person.name}</Title>
            <Button
              type="primary"
              shape="circle"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/person-list/${personId}/edit`);
              }}
            >
              <EditOutlined />
            </Button>
          </Flex>
          {person?.alsoKnownAs?.length && (
            <Space wrap className="person-details-also-known-as">
              {person.alsoKnownAs?.map((alias, index) => (
                <Tag key={index} color="blue">
                  {alias}
                </Tag>
              ))}
            </Space>
          )}
        </div>
      </div>

      <Descriptions
        title="Personal Info"
        layout="vertical"
        bordered
        items={items}
      />

      {person.biography && (
        <div className="person-details-bio">
          <Title level={4}>Biography</Title>
          <Paragraph>{person.biography}</Paragraph>
        </div>
      )}
    </Card>
  );
};

export default PersonDetails;
