import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button";

test("Checks if the correct text input gets to the button component",() => {
    //Renders the Button component
    const root = document.createElement("div");
    ReactDOM.render(
    <Button
        title="Browse Recipes"
        description="Find all your favorites in the collection."
        linkText="All recipes"
        navLink="/recipes"
        
    />, root);

    //Uses querySelector to make testable statements
    expect(root.querySelector("h3").textContent).toBe("Browse Recipes");
    expect(root.querySelector("p").textContent).toBe("Find all your favorites in the collection.");
    expect(root.querySelector("a").textContent).toBe("All recipes");
    expect(root.querySelector("a").href).toBe("http://localhost/recipes");
    expect(root.querySelector("a").target).toBe("");
});