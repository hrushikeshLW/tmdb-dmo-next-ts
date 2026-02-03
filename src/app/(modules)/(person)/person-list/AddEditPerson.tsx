"use client";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import React, { useEffect } from "react";
import { GET_PERSON } from "./graphql/Query";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Switch,
  Button,
  InputNumber,
  Breadcrumb,
} from "antd";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { CREATE_PERSON, UPDATE_PERSON } from "./graphql/Mutation";
import { createPersonList } from "@/actions/create-action";
import { useRouter } from "next/navigation";
import Portal from "@/components/Portal";

const { TextArea } = Input;

const AddEditPerson = ({ personId }: { personId?: string }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [createPerson, { loading: createLoading }] = useMutation(
    CREATE_PERSON,
    {
      onCompleted() {
        router.push("/person-list");
      },
    },
  );
  const [updatePerson, { loading: updateLoading }] = useMutation(
    UPDATE_PERSON,
    {
      onCompleted() {
        router.push("/person-list");
      },
    },
  );

  const [getPerson, { data, loading }] = useLazyQuery(GET_PERSON);

  useEffect(() => {
    if (personId) {
      getPerson({ variables: { id: personId } });
    }
  }, [personId]);

  useEffect(() => {
    if (data?.person?.data) {
      form.setFieldsValue({
        ...data.person.data,
        birthday: data.person.data.birthday
          ? dayjs(data.person.data.birthday)
          : null,
        deathday: data.person.data.deathday
          ? dayjs(data.person.data.deathday)
          : null,
      });
    }
  }, [data, form]);

  const onFinish = (values: FormDataEvent) => {
    console.log("Form values:", values);
    const formattedValues = {
      ...values,
      birthday: values?.birthday ? values?.birthday.format("YYYY-MM-DD") : null,
      deathday: values?.deathday ? values?.deathday.format("YYYY-MM-DD") : null,
    };

    if (personId) {
      updatePerson({
        variables: {
          id: personId,
          data: formattedValues,
        },
      });
    } else {
      createPerson({
        variables: {
          data: formattedValues,
        },
      });
    }
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "white" }}>
      <Portal portalId="breadcrumbs">
        <Breadcrumb
          items={[
            { title: "Person", href: "/person-list" },
            {
              title: data?.person?.data?.name,
              href: `/person-list/${personId}`,
            },
            { title: personId ? "Edit Person" : "Add Person" },
          ]}
        />
      </Portal>
      <Title level={3}>{personId ? "Edit Person" : "Add Person"}</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          adult: false,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          <Form.Item
            label="TMDB ID"
            name="tmdbId"
            rules={[{ required: true, message: "Please enter TMDB ID" }]}
          >
            <Input placeholder="Enter TMDB ID" />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter person name" />
          </Form.Item>

          <Form.Item label="Birthday" name="birthday">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Deathday" name="deathday">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Known For Department"
            name="knownForDepartment"
            rules={[
              {
                required: true,
                message: "Please enter known for department",
              },
            ]}
          >
            <Input placeholder="e.g., Acting, Directing" />
          </Form.Item>

          <Form.Item label="Place of Birth" name="placeOfBirth">
            <Input placeholder="Enter place of birth" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select
              placeholder="Select gender"
              options={[
                { value: "MALE", label: "Male" },
                { value: "FEMALE", label: "Female" },
                { value: "NON_BINARY", label: "Non-Binary" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Popularity" name="popularity">
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              step={0.1}
              placeholder="Enter popularity score"
            />
          </Form.Item>

          <Form.Item label="Profile Path" name="profilePath">
            <Input placeholder="Enter profile image path" />
          </Form.Item>

          <Form.Item label="Home Page" name="homePage">
            <Input placeholder="Enter homepage URL" />
          </Form.Item>

          <Form.Item label="Adult" name="adult" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>

        <Form.Item label="Also Known As" name="alsoKnownAs">
          <Select
            mode="tags"
            placeholder="Enter alternative names"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Biography"
          name="biography"
          style={{ marginTop: "16px" }}
        >
          <TextArea rows={4} placeholder="Enter person biography" />
        </Form.Item>

        <Form.Item style={{ marginTop: "24px" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading || createLoading || updateLoading}
          >
            {personId ? "Update Person" : "Create Person"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEditPerson;
