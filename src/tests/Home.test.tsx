import { describe, it, expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

expect.extend(matchers);

// Home tests
describe("Home screen", () => {
    it("should have title", () => {
        render(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>);
        expect(screen.getAllByRole("heading")[0]).toHaveTextContent(/who's the faker?/i)
    })

    it("should have join game button", () => {
        render(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>);
        expect(screen.getByText(/join game/i)).toBeInTheDocument();
    })

    it("should have a sign in button", () => {
        render(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>);
        expect(screen.queryByText(/sign in/i)).not.toBe(null);
    })
    
    it("should have a sign up button", () => {
        render(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>);
        expect(screen.queryByRole("button", { name: /sign up/i})).not.toBe(null);
    })

    it("should display the rules", () => {
        render(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>);
        expect(screen.queryByText(/who's the faker\? rules/i)).toBeInTheDocument();
    })

    // buttons should redirect to correct locations
})



