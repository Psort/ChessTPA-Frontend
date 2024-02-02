import styled from 'styled-components';

export const AnalysisWindowContainer = styled.div`
  height: 40rem;
  width: 20rem;
  //position: absolute;
  //margin-right: 80rem;
  border-radius: 1rem;
  box-shadow: 0 0 2rem var(--color-primary);
  display: grid;
  grid-template-columns: repeat(2, 1fr);  // Dwie kolumny równomiernie podzielone
  gap: 1rem;  // Odstęp między elementami
  justify-content: start;  // Zaczynaj od góry
  align-content: start;  // Zaczynaj od góry
  padding: 1rem;  // Dodaj padding, aby tekst nie przylegał do krawędzi
`;