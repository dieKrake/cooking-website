import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

describe("Card primitives", () => {
  it("renders all card slots and supports the small size", () => {
    render(
      <Card data-testid="card-root" size="sm">
        <CardHeader>
          <CardTitle>Titel</CardTitle>
          <CardDescription>Beschreibung</CardDescription>
          <CardAction>Aktion</CardAction>
        </CardHeader>
        <CardContent>Inhalt</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByTestId("card-root")).toHaveAttribute("data-size", "sm");
    expect(screen.getByText("Titel")).toHaveAttribute(
      "data-slot",
      "card-title",
    );
    expect(screen.getByText("Beschreibung")).toHaveAttribute(
      "data-slot",
      "card-description",
    );
    expect(screen.getByText("Aktion")).toHaveAttribute(
      "data-slot",
      "card-action",
    );
    expect(screen.getByText("Inhalt")).toHaveAttribute(
      "data-slot",
      "card-content",
    );
    expect(screen.getByText("Footer")).toHaveAttribute(
      "data-slot",
      "card-footer",
    );
  });

  it("uses the default size", () => {
    render(<Card data-testid="card-root">Content</Card>);
    expect(screen.getByTestId("card-root")).toHaveAttribute(
      "data-size",
      "default",
    );
  });
});
