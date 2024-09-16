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
  onFilterChange: (title: string, values: string[]) => void;
};

export function Accordion({ title, onFilterChange }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const unieuqValues = useMemo(() => {
    const values = collections.map(
      (collection) => collection[title as keyof typeof collection]
    );
    return Array.from(new Set(values));
  }, [title]);

  const handleCheckboxChange = (value: string) => {
    setSelectedValues((prev) => {
      const newValues = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      onFilterChange(title, newValues);
      return newValues;
    });
  };
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
                <AccordionInput
                  type="checkbox"
                  checked={selectedValues.includes(String(value))}
                  onChange={() => handleCheckboxChange(String(value))}
                />
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
