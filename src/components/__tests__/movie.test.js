import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Movie from "../movie";

configure({ adapter: new Adapter() });

describe("Movie", () => {
  it("renders correctly", () => {
    const testProps = {
      popularity: 569.937,
      id: 475557,
      video: false,
      vote_count: 3577,
      vote_average: 8.6,
      title: "Joker",
      release_date: "2019-10-04",
      original_language: "en",
      original_title: "Joker",
      genre_ids: [80, 53, 18],
      backdrop_path: "/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
      adult: false,
      overview:
        "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
      poster_path: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
    };
    const wrapper = shallow(<Movie movie={testProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
