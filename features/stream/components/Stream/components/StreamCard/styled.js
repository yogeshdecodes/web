import React from "react";
import styled from "styled-components";
// import {Card} from "vendor/bulma";
import { darker } from "styles/colors";

const StreamCard = styled.div`
  padding: 0px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: none !important;
  box-shadow: 1px 0px 81px -22px rgba(0,0,0,0.75);
  border-top ${props =>
      props.highlighted
          ? "3px solid " + darker(props.accent)
          : "none"} !important;

  header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #F7F7F7;
    border-bottom: none;
    padding: 1rem;
  }

  footer {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #F7F7F7;
    border-top: none;
    padding: 1rem;
  }
  
  header .level {
    width: 100%;
  }

  .card-content {
    padding: 1rem;
  }
  
  @media screen and (max-width: 768px) {
    & {
      border-radius: 0px !important;
    }
    header {
      border-radius: 0px !important;
    }
    footer {
      border-radius: 0px !important;
    }
  }
`;

StreamCard.Footer = props => <footer>{props.children}</footer>;

export { StreamCard };
