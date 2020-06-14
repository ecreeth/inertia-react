import React, { createElement, useEffect, useState } from "react";
import usePage from "./usePage";
import { atom, useRecoilState } from "recoil";
import { Inertia } from "@inertiajs/inertia";

function InertiaApp({ initialPage, resolveComponent }) {
  const [page, setPage] = useRecoilState(usePage);

  useEffect(() => {
    Inertia.init({
      initialPage,
      resolveComponent,
      updatePage: (component, props, { preserveState }) => {
        setPage({
          ...props,
          component,
          key: preserveState ? page.key : Date.now(),
        });
      },
    });
  }, [initialPage, resolveComponent]);

  if (!page.component) {
    return null;
  }

  return createElement(page.component);
}

export default React.memo(InertiaApp);
