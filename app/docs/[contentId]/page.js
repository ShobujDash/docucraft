import ContentDisplay from '@/components/ContentDisplay';
import React from 'react'

function ContentPage({params:{contentId}}) {
  return (
    <div>
      <ContentDisplay id={contentId}/>
    </div>
  )
}

export default ContentPage;
