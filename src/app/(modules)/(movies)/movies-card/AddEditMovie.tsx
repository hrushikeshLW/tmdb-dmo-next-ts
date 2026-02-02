"use client";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import React, { useEffect } from "react";
import {
  GET_MOVIE,
  GET_COUNTRIES,
  GET_LANGUAGES,
  GET_PRODUCTION_COMPANIES,
  GET_GENRES,
} from "../graphql/Query";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Switch,
  Button,
} from "antd";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { map } from "lodash";
import { CREATE_MOVIE, UPDATE_MOVIE } from "../graphql/Mutation";

const { TextArea } = Input;

const AddEditMovie = ({ movieId }: { movieId?: string }) => {
  const [form] = Form.useForm();

  const [createMovie, { loading: createLoading }] = useMutation(CREATE_MOVIE, {
    onCompleted: (data) => {
      console.log("Movie created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating movie:", error);
    },
  });
  const [updateMovie, { loading: updateLoading }] = useMutation(UPDATE_MOVIE, {
    onCompleted: (data) => {
      console.log("Movie updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating movie:", error);
    },
  });
  const [getMovie, { data, loading }] = useLazyQuery(GET_MOVIE);
  const { data: countriesData, loading: countriesLoading } =
    useQuery(GET_COUNTRIES);
  const { data: languagesData, loading: languagesLoading } =
    useQuery(GET_LANGUAGES);
  const { data: companiesData, loading: companiesLoading } = useQuery(
    GET_PRODUCTION_COMPANIES,
  );
  const { data: genresData, loading: genresLoading } = useQuery(GET_GENRES);

  useEffect(() => {
    if (movieId) {
      getMovie({ variables: { id: movieId } });
    }
  }, [movieId]);

  useEffect(() => {
    if (data?.movie?.data) {
      form.setFieldsValue({
        ...data.movie.data,
        releaseDate: data.movie.data.releaseDate
          ? dayjs(data.movie.data.releaseDate)
          : null,
        countryIds: map(data?.movie?.data?.countries, (country) => country?.id),
        languageIds: map(
          data?.movie?.data?.languages,
          (language) => language?.id,
        ),
        genres: map(data?.movie?.data?.genres, (genre) => genre?.id),
      });
    }
  }, [data, form]);

  const onFinish = (values: FormDataEvent) => {
    console.log("Form values:", values);
    if (movieId) {
      updateMovie({
        variables: {
          id: movieId,
          data: {
            ...values,
            companies: map(values?.companies, (id) => {
              id;
            }),
            genres: map(values?.genres, (id) => {
              id;
            }),
          },
        },
      });
    } else {
      createMovie({
        variables: {
          data: {
            ...values,
            companies: map(values?.companies, (id) => {
              id;
            }),
            genres: map(values?.genres, (id) => {
              id;
            }),
          },
        },
      });
    }
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "white" }}>
      <Title level={3}>{movieId ? "Edit Movie" : "Add Movie"}</Title>
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
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Enter movie title" />
          </Form.Item>

          <Form.Item
            label="Original Title"
            name="originalTitle"
            rules={[{ required: true, message: "Please enter original title" }]}
          >
            <Input placeholder="Enter original title" />
          </Form.Item>

          <Form.Item
            label="Original Language"
            name="originalLanguage"
            rules={[
              { required: true, message: "Please enter original language" },
            ]}
          >
            <Input placeholder="e.g., en, es, fr" />
          </Form.Item>

          <Form.Item
            label="Release Date"
            name="releaseDate"
            rules={[{ required: true, message: "Please select release date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Budget"
            name="budget"
            rules={[{ required: true, message: "Please enter budget" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Enter budget"
            />
          </Form.Item>

          <Form.Item
            label="Revenue"
            name="revenue"
            rules={[{ required: true, message: "Please enter revenue" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Enter revenue"
            />
          </Form.Item>

          <Form.Item
            label="Runtime (minutes)"
            name="runtime"
            rules={[{ required: true, message: "Please enter runtime" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Enter runtime in minutes"
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select
              placeholder="Select status"
              options={[
                { value: "Released", label: "Released" },
                { value: "In Production", label: "In Production" },
                { value: "Post Production", label: "Post Production" },
                { value: "Planned", label: "Planned" },
                { value: "Rumored", label: "Rumored" },
                { value: "Canceled", label: "Canceled" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Tagline"
            name="tagline"
            rules={[{ required: true, message: "Please enter tagline" }]}
          >
            <Input placeholder="Enter tagline" />
          </Form.Item>

          <Form.Item
            label="Countries"
            name="countryIds"
            rules={[{ required: true, message: "Please select countries" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select countries"
              loading={countriesLoading}
              options={
                countriesData?.countries?.data?.map((country) => ({
                  label: country?.englishName,
                  value: country?.id,
                })) || []
              }
            ></Select>
          </Form.Item>

          <Form.Item
            label="Languages"
            name="languageIds"
            rules={[{ required: true, message: "Please select languages" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select languages"
              loading={languagesLoading}
              options={
                languagesData?.languages?.data?.map((language) => ({
                  label: language?.englishName,
                  value: language?.id,
                })) || []
              }
            ></Select>
          </Form.Item>

          <Form.Item
            label="Companies"
            name="companies"
            rules={[
              { required: true, message: "Please select production companies" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select production companies"
              loading={companiesLoading}
              options={
                companiesData?.listProductionCompanies?.data?.map(
                  (company) => ({
                    label: company?.name,
                    value: company?.id,
                  }),
                ) || []
              }
            ></Select>
          </Form.Item>

          <Form.Item
            label="Genres"
            name="genres"
            rules={[{ required: true, message: "Please select genres" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select genres"
              loading={genresLoading}
              options={
                genresData?.listGenre?.map((genre) => ({
                  label: genre?.name,
                  value: genre?.id,
                })) || []
              }
            ></Select>
          </Form.Item>

          <Form.Item label="Adult" name="adult" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>

        <Form.Item
          label="Overview"
          name="overview"
          rules={[{ required: true, message: "Please enter overview" }]}
          style={{ marginTop: "16px" }}
        >
          <TextArea rows={4} placeholder="Enter movie overview" />
        </Form.Item>

        <Form.Item style={{ marginTop: "24px" }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {movieId ? "Update Movie" : "Create Movie"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEditMovie;
