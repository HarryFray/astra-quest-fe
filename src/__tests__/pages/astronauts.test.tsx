import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import AstronautsPage from "../../pages/astronauts";
import { SessionProvider } from "next-auth/react";
import mockRouter from "next-router-mock";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();
jest.mock("axios");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("AstronautsPage Component", () => {
  it("renders without crashing", () => {
    render(
      <SessionProvider>
        <AstronautsPage />
      </SessionProvider>
    );
  });
});
