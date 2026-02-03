"use client";
import React, { use } from "react";
import AddEditPerson from "../../AddEditPerson";

const EditPerson = ({ params }: { params: Promise<{ personId: string }> }) => {
  const { personId } = use(params);
  return (
    <>
      <AddEditPerson personId={personId} />
    </>
  );
};

export default EditPerson;
