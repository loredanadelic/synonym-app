import SynonymService from "../src/services/SynonymService";
import { describe, test, expect, beforeEach } from '@jest/globals';

describe("SynonymService", () => {
  let service : SynonymService

  beforeEach(() => {
    service = new SynonymService();
  });

  test("should return empty array when no synonyms exist", () => {
    expect(service.getSynonyms("unknown")).toEqual([]);
  });

  test("should add word with synonyms and get correct synonyms", () => {
    service.addWordWithSynonyms("clean", ["wash", "tidy"]);

    expect(service.getSynonyms("clean").sort()).toEqual(
      ["wash", "tidy"].sort()
    );
    expect(service.getSynonyms("wash").sort()).toEqual(
      ["clean", "tidy"].sort()
    );
    expect(service.getSynonyms("tidy").sort()).toEqual(
      ["clean", "wash"].sort()
    );
  });

  test("should merge synonym groups transitively", () => {
    service.addWordWithSynonyms("clean", ["wash"]);
    service.addWordWithSynonyms("wash", ["rinse"]);

    expect(service.getSynonyms("clean").sort()).toEqual(
      ["wash", "rinse"].sort()
    );
    expect(service.getSynonyms("rinse").sort()).toEqual(
      ["clean", "wash"].sort()
    );
  });

  test("should handle adding synonyms to existing word", () => {
    service.addWordWithSynonyms("boat", ["ship"]);
    service.addWordWithSynonyms("boat", ["vessel"]);

    expect(service.getSynonyms("boat").sort()).toEqual(
      ["ship", "vessel"].sort()
    );
    expect(service.getSynonyms("ship").sort()).toEqual(
      ["boat", "vessel"].sort()
    );
    expect(service.getSynonyms("vessel").sort()).toEqual(
      ["boat", "ship"].sort()
    );
  });

  test("should not return the word itself in synonyms", () => {
    service.addWordWithSynonyms("car", ["automobile", "vehicle"]);

    const synonyms = service.getSynonyms("car");
    expect(synonyms).not.toContain("car");
    expect(synonyms.sort()).toEqual(["automobile", "vehicle"].sort());
  });

  test("should support multiple separate synonym groups", () => {
    service.addWordWithSynonyms("cat", ["feline"]);
    service.addWordWithSynonyms("dog", ["canine"]);

    expect(service.getSynonyms("cat").sort()).toEqual(["feline"].sort());
    expect(service.getSynonyms("dog").sort()).toEqual(["canine"].sort());
    expect(service.getSynonyms("feline").sort()).toEqual(["cat"].sort());
    expect(service.getSynonyms("canine").sort()).toEqual(["dog"].sort());
  });
});
