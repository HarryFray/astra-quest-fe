import { renderHook } from "@testing-library/react-hooks";
import mockRouter from "next-router-mock";
import { useSession } from "next-auth/react";
import useProtectedRoute from "../../hooks/useProtectedRoute";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

describe("useProtectedRoute Hook", () => {
  it.skip('redirects to "/" if session is not available', () => {
    const sessionMock = { data: null, status: "authenticated" };

    const { result } = renderHook(() => useProtectedRoute());

    expect(mockRouter.asPath).toEqual("/");
    expect(result.current.session).toBeNull();
    expect(result.current.status).toBe("authenticated");
  });

  it.skip("does not redirect if session is available", () => {
    const sessionMock = { data: { user: "user" }, status: "authenticated" };

    const { result } = renderHook(() => useProtectedRoute());

    expect(mockRouter.asPath).toBeUndefined();
    expect(result.current.session).toEqual({ user: "user" });
    expect(result.current.status).toBe("authenticated");
  });

  it.skip("does not redirect while loading", () => {
    const sessionMock = { data: null, status: "loading" };

    const { result } = renderHook(() => useProtectedRoute());

    expect(mockRouter.asPath).toBeUndefined();
    expect(result.current.session).toBeNull();
    expect(result.current.status).toBe("loading");
  });
});
