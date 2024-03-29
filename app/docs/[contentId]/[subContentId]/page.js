import ContentDisplay from "@/components/ContentDisplay";

function SubContentPage({ params: { subContentId } }) {
  return <ContentDisplay id={subContentId} />;
}

export default SubContentPage;
