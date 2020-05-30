import React, { createElement, useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";

function InertiaApp({ initialPage, resolveComponent }) {
  const [page, setPage] = useState({
    component: null,
    key: null,
    props: {},
  });

  useEffect(() => {
    Inertia.init({
      initialPage,
      resolveComponent,
      updatePage: (component, props, { preserveState }) => {
        setPage({
          component,
          props,
          key: preserveState ? page.key : Date.now(),
        });
      },
    });
  }, [initialPage, resolveComponent]);

  if (!page.component) {
    return null;
  }

  return createElement(page.component, {
    props: page.props,
    key: page.key,
  });
}

export default React.memo(InertiaApp);
