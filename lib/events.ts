import { TimelineEvent } from "./types";

export const initialEvents: TimelineEvent[] = [
  ["evt-001", "1440", "Movable Type", "A printing press begins the age of reproducible thought."],
  ["evt-002", "1776", "A New Republic", "A declaration redraws the political imagination."],
  ["evt-003", "1859", "The Theory of Life", "A naturalist changes how humanity locates itself in nature."],
  ["evt-004", "1903", "First Powered Flight", "A machine rises into the air under its own power."],
  ["evt-005", "1928", "Penicillin Observed", "A stray mold opens a new era for medicine."],
  ["evt-006", "1945", "Atomic Threshold", "The force within matter is released into history."],
  ["evt-007", "1969", "Footprints on the Moon", "Human beings touch another world."],
  ["evt-008", "1989", "The Wall Opens", "A divided city becomes a symbol of a changing order."],
  ["evt-009", "2007", "The Pocket Computer", "A new interface compresses the network into daily life."],
  ["evt-010", "2020", "Global Pause", "A health crisis reorganizes the rhythms of the planet."],
].map(([id, year, title, description], index) => ({ id, year, title, description, position: index }));
