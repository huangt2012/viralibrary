import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AutoComplete, { OptionType } from './AutoComplete'

interface LakerWidthNumber {
  value: string
  number: string
}

const SimpleComplete = () => {
   const lakersWithNumber = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0},
  ]
    const handleFetch = (query: string) => {
      return lakersWithNumber.filter(item => item.value.includes(query))
    }
    const renderOption = (item: OptionType) => {
      const { value, number } = item as OptionType<LakerWidthNumber>
      return (<h2>
        {value}
        {number}
      </h2>)
    }
  
    return (
        <AutoComplete
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
            // renderOption={renderOption}
        />
    )
}

const FetchComplete = () => {

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        return items.map((item: any) => ({ value: item.login, ...item }))
      })
  }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
    />
  )
}

storiesOf('AutoComplete 组件', module)
    .add('AutoComplete', SimpleComplete)
    .add('异步请求', FetchComplete)
