import { createFileRoute } from "@tanstack/react-router";
import { VerifyHashPage } from "./verifyHash";

export const Route = createFileRoute("/hash-verification")({
  head: () => ({
    meta: [
      { title: "Verify Document Hash & Authenticity | SignAny 2.0" },
      {
        name: "description",
        content:
          "Verify the cryptographic integrity of signed documents. Compare SHA-256 checksum hashes to ensure documents are 100% authentic and tamper-proof.",
      },
    ],
  }),
  component: VerifyHashPage,
});
