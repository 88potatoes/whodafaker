import { describe, it, expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import { createRoot } from "react-dom/client";
import Login from "../pages/Login";
import JoinRoom from "../pages/JoinRoom";
import Signup from "../pages/Signup";

expect.extend(matchers);

// Home tests
describe("Home screen", () => {
    it("should have title", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>);
        expect(screen.getAllByRole("heading")[0]).toHaveTextContent(/who's the faker\?/i)

    })

    it("should have join game button and the button should redirect to '/join'", () => {

        const { getAllByText } = render(<MemoryRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/join" element={<JoinRoom />} />
            </Routes>
        </MemoryRouter>);

        // Starts at '/'

        // Go to '/join'
        const joinButton = getAllByText(/join room/i)[0];
        fireEvent.click(joinButton);
        expect(getAllByText(/join room/i)[0]).toBeInTheDocument();

    })

    it("should have a sign in button which takes you to the sign in page '/login'", () => {

        const { getAllByText } = render(<MemoryRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </MemoryRouter>);


        const signInButton = getAllByText(/Log in/i)[0];
        fireEvent.click(signInButton);  // go to '/login'
        expect(getAllByText(/Login/i)[0]).toBeInTheDocument();
    })

    it("should have a sign up button which takes you to the sign up page '/signup'", () => {

        const { getAllByText } = render(<MemoryRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </MemoryRouter>);


        const signUpButton = getAllByText(/Sign up/i)[0];
        fireEvent.click(signUpButton);  // go to '/signup'
        expect(getAllByText(/Sign up/i)[0]).toBeInTheDocument();
    })

    it("should be able to smoothly navigate between unauthorised pages", () => {
        const { getAllByText } = render(<MemoryRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/join" element={<JoinRoom />} />
            </Routes>
        </MemoryRouter>);

        // / -> /join -> / -> /login -> /signup -> / -> /signup -> /login

        // / -> /join
        fireEvent.click(getAllByText(/join room/i)[0]);
        expect(getAllByText(/join room/i)[0]).toBeInTheDocument();
        
        // /join -> /
        fireEvent.click(getAllByText(/Home/i)[0]);
        expect(getAllByText(/Who's the Faker\?/i)[0]).toBeInTheDocument();
        
        // / -> /login
        fireEvent.click(getAllByText(/Log in/i)[0]);
        expect(getAllByText(/Login/i)[0]).toBeInTheDocument();

        // /login -> /signup
        fireEvent.click(getAllByText(/Sign up/i)[0]);
        expect(getAllByText(/Sign up/i)[0]).toBeInTheDocument();

        // /signup -> /
        fireEvent.click(getAllByText(/home/i)[0]);
        expect(getAllByText(/who's the faker\?/i)[0]).toBeInTheDocument();

        // / -> /signup
        fireEvent.click(getAllByText(/sign up/i)[0]);
        expect(getAllByText(/sign up/i)[0]).toBeInTheDocument();

        // /signup -> /login
        fireEvent.click(getAllByText(/Log in/i)[0]);
        expect(getAllByText(/Login/i)[0]).toBeInTheDocument();
    })
    // it("should display the rules", () => {
    //     render(
    //         <MemoryRouter>
    //             <Home />
    //         </MemoryRouter>);
    //     expect(screen.queryByText(/who's the faker\? rules/i)).toBeInTheDocument();
    // })

    // buttons should redirect to correct locations
})



