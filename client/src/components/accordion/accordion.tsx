import { useMemo, useState } from "react";
import { DividerWithText } from "../login/login.style";
import { collections } from "../../mock/collection-shop";
import {
  AccordionItem,
  AccordionHeader,
  AccordionTitle,
  AccordionIcon,
  AccordionContent,
  AccordionLabel,
  AccordionInput,
} from "./accordion.style";

type Props = {
  title: string;
};

export function Accordion({ title }: Props) {
  const [isActive, setIsActive] = useState(false);

  const unieuqValues = useMemo(() => {
    const values = collections.map(
      (collection) => collection[title as keyof typeof collection]
    );

    return Array.from(new Set(values));
  }, [title]);

  return (
    <AccordionItem>
      <AccordionHeader onClick={() => setIsActive(!isActive)}>
        <AccordionTitle>{title}</AccordionTitle>
        <AccordionIcon>{isActive ? "-" : "+"}</AccordionIcon>
      </AccordionHeader>
      {isActive && (
        <AccordionContent>
          {unieuqValues.map((value, index) => (
            <div key={index}>
              <AccordionLabel>
                <AccordionInput type="checkbox" />
                <AccordionLabel>{value}</AccordionLabel>
              </AccordionLabel>
            </div>
          ))}
        </AccordionContent>
      )}
      <DividerWithText />
    </AccordionItem>
  );
}
