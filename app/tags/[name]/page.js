import React from "react";
import ContentDisplay from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentByTag } from "@/utils/doc-utils";

function TagPage({ params: { name } }) {
  const docs = getDocuments();
  const matchedDocuments = getDocumentByTag(docs, name);

  return (
      <ContentDisplay id={matchedDocuments[0].id}/>
    );
}

export default TagPage;
