import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const LanguageButton = styled.button<{ isActive: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : "transparent"};
  color: ${({ theme, isActive }) => (isActive ? "#ffffff" : theme.colors.text)};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}22`};
  }
`;

const languages = [
  { code: "zh", name: "中文" },
  { code: "en", name: "English" },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SwitcherContainer>
      {languages.map((lang) => (
        <LanguageButton
          key={lang.code}
          isActive={i18n.language === lang.code}
          onClick={() => changeLanguage(lang.code)}
        >
          {lang.name}
        </LanguageButton>
      ))}
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;
