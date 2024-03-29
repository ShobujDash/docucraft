import ContentDisplay from "@/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";
import { getDocumentByCategory } from "@/utils/doc-utils";

function CategoriesPage({ params: { name } }) {
  const docs = getDocuments();
  const matchedDocuments = getDocumentByCategory(docs, name);

    if (!matchedDocuments || matchedDocuments.length === 0) {
      // Handle the case when no documents are found
      return <p>No documents found for the category: {name}</p>;
    }

  return <ContentDisplay id={matchedDocuments[0].id} />;
}

export default CategoriesPage;
