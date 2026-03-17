import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type NavigateFn = (to: string) => void;

interface RouterCtx {
  path: string;
  search: string;
  navigate: NavigateFn;
}

const RouterContext = createContext<RouterCtx>({
  path: "/",
  search: "",
  navigate: () => {},
});

export function BrowserRouter({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(() => ({
    path: window.location.pathname,
    search: window.location.search,
  }));

  useEffect(() => {
    const handler = () => {
      setLocation({
        path: window.location.pathname,
        search: window.location.search,
      });
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const navigate: NavigateFn = (to) => {
    const [p, s] = to.split("?");
    window.history.pushState({}, "", to);
    setLocation({ path: p, search: s ? `?${s}` : "" });
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ ...location, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useNavigate(): NavigateFn {
  return useContext(RouterContext).navigate;
}

export function useParams<T extends Record<string, string>>(): T {
  const { path } = useContext(RouterContext);
  const parts = path.split("/").filter(Boolean);
  const slug = parts[1] ? decodeURIComponent(parts[1]) : "";
  // Both /category/:category and /product/:id use the second segment
  return { id: slug, category: slug } as unknown as T;
}

export function useSearchParams(): [
  URLSearchParams,
  (params: Record<string, string>) => void,
] {
  const { search, navigate, path } = useContext(RouterContext);
  const params = new URLSearchParams(search);
  const setParams = (newParams: Record<string, string>) => {
    const sp = new URLSearchParams(newParams);
    const qs = sp.toString();
    navigate(qs ? `${path}?${qs}` : path);
  };
  return [params, setParams];
}

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  children: ReactNode;
};

export function Link({ to, children, onClick, ...props }: LinkProps) {
  const { navigate } = useContext(RouterContext);
  return (
    <a
      {...props}
      href={to}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) (onClick as React.MouseEventHandler<HTMLAnchorElement>)(e);
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

interface RouteProps {
  path: string;
  element: ReactNode;
}

export function Route(_props: RouteProps): null {
  return null;
}

function matchRoute(pattern: string, actual: string): boolean {
  if (pattern === actual) return true;
  const pp = pattern.split("/");
  const ap = actual.split("?")[0].split("/");
  if (pp.length !== ap.length) return false;
  return pp.every((seg, i) => seg.startsWith(":") || seg === ap[i]);
}

export function Routes({ children }: { children: ReactNode }) {
  const { path } = useContext(RouterContext);
  const routes = React.Children.toArray(
    children,
  ) as React.ReactElement<RouteProps>[];
  const matched = routes.find((r) => matchRoute(r.props.path, path));
  return <>{matched?.props.element ?? null}</>;
}
