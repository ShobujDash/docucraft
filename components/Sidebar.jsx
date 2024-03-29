"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getDocumentByCategory,
  getDocumentByAuthor,
  getDocumentByTag,
} from "@/utils/doc-utils";

function Sidebar({ docs }) {
  const pathName = usePathname();
  const [rootNodes, setRootNodes] = useState([]);
  const [nonRootNodeGrouped, setNonRootNodeGrouped] = useState({});

  useEffect(() => {
    let matchedDocs = docs;
    if (pathName.includes("/tags")) {
      const tag = pathName.split("/")[2];
      matchedDocs = getDocumentByTag(docs, tag);
    } else if (pathName.includes("/authors")) {
      const author = pathName.split("/")[2];
      matchedDocs = getDocumentByAuthor(docs, author);
    } else if (pathName.includes("/categories")) {
      const category = pathName.split("/")[2];
      matchedDocs = getDocumentByCategory(docs, category);
    }

    const roots = matchedDocs.filter((doc) => !doc.parent);

    const nonRoots = Object.groupBy(
      matchedDocs.filter((doc) => doc.parent),
      ({ parent }) => parent
    );

    const nonRootKeys = Reflect.ownKeys(nonRoots);
    nonRootKeys.forEach(key => {
      const foundInRoots = roots.find((root) => root.id === key); 
      if (!foundInRoots) {
        const foundInDocs = docs.find((doc) => doc.id === key);
        roots.push(foundInDocs);
      }
    })

      roots.sort((a, b) => {
       if (a.order < b.order) {
         return -1;
       }
       if (a.order > b.order) {
         return 1
       }
       return 0
     
     });



    setRootNodes([...roots]);
    setNonRootNodeGrouped({ ...nonRoots });
  }, [pathName]);

  // console.log(nonRoots)f
  // console.log(nonRoots["introduction"]);

  return (
    <nav className="my-10 lg:block">
      <ul>
        <div className="relative mt-3 pl-2">
          <div className="absolute inset-x-0 top-0 bg-zinc-800/2 5 will-change-transform dark:bg-white/2.5" />
        </div>
        <div className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"></div>
        <div className="absolute left-2 h-6 w-px bg-emerald-500"></div>
        <ul className="border-l border-transparent">
          {rootNodes.map((rootNode) => (
            <li key={rootNode.id} className="relative">
              <Link
                aria-current="page"
                className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
                href={`/docs/${rootNode.id}`}
              >
                <span className="truncate">{rootNode.title}</span>
              </Link>
              {nonRootNodeGrouped[rootNode.id] && (
                <ul className="border-l border-transparent">
                  {nonRootNodeGrouped[rootNode.id].map((subRoot) => (
                    <li key={subRoot.id}>
                      <Link
                        className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                        href={`/docs/${rootNode.id}/${subRoot.title}`}
                      >
                        <span className="truncate">{subRoot.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  );
}

export default Sidebar;
