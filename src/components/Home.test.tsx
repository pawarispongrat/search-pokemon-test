import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_POKEMON } from '../lib/testQuery';
import { useQuery } from '@apollo/client';

const PokemonType = ({ name }: { name: string }) => {
  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { name },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return <p data-testid="type">{data.pokemon.types[0]}</p>;
};

const mocks = [
  {
    request: {
      query: GET_POKEMON,
      variables: { name: 'Bulbasaur' },
    },
    result: {
      data: {
        pokemon: {
          name: 'Bulbasaur',
          types: ['Grass'],
        },
      },
    },
  },
  {
    request: {
      query: GET_POKEMON,
      variables: { name: 'Charmander' },
    },
    result: {
      data: {
        pokemon: {
          name: 'Charmander',
          types: ['Fire'],
        },
      },
    },
  },
  {
    request: {
      query: GET_POKEMON,
      variables: { name: 'Squirtle' },
    },
    result: {
      data: {
        pokemon: {
          name: 'Squirtle',
          types: ['Water'],
        },
      },
    },
  },
];

describe('Pokemon Type GraphQL Fetch Test', () => {
  it('returns correct type for Bulbasaur', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mocks[0]]} addTypename={false}>
        <PokemonType name="Bulbasaur" />
      </MockedProvider>
    );

    await waitFor(() => expect(getByTestId('type').textContent).toBe('Grass'));
  });

  it('returns correct type for Charmander', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mocks[1]]} addTypename={false}>
        <PokemonType name="Charmander" />
      </MockedProvider>
    );

    await waitFor(() => expect(getByTestId('type').textContent).toBe('Fire'));
  });

  it('returns correct type for Squirtle', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mocks[2]]} addTypename={false}>
        <PokemonType name="Squirtle" />
      </MockedProvider>
    );

    await waitFor(() => expect(getByTestId('type').textContent).toBe('Water'));
  });
});
