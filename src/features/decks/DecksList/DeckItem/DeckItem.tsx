import s from './DeckItem.module.css'
import { useAppDispatch } from '../../../../app/store.ts'
import { deleteDeckTC, updateDeckTC } from '../../decks-thunks.ts'
import { Deck } from '../../decks-api.ts'
import { useState } from 'react'

type DeckProps = {
  deck: Deck
}

const TEST_ACC_NAME = 'Sweety5y'

export const DeckItem = ({ deck }: DeckProps) => {
  const isTestingDeck = deck.author.name === TEST_ACC_NAME
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(false)

  const handleDeleteButtonClick = () => {
    setLoading(true)
    dispatch(deleteDeckTC(deck.id))
      .then((e)=>setLoading(false))
  }

  const handleEditButtonClick = () => {
    setLoading(true)
    dispatch(updateDeckTC({ id: deck.id, name: `${deck.name} updated` }))
      .then((e)=>setLoading(false))
  }

  return (
    <li className={s.item}>
      <h3 className={s.title}>
        {deck.name}
        {isTestingDeck && '✨'}
      </h3>
      <p className={s.characteristic}>
        <b>Author:</b> {deck.author.name}
      </p>
      <p className={s.characteristic}>
        <b>Created:</b> {new Date(deck.created).toLocaleString('ru-Ru')}
      </p>
      <p className={s.characteristic}>
        <b>Updated:</b> {new Date(deck.updated).toLocaleString('ru-Ru')}
      </p>

      {isTestingDeck && (
        <div className={s.buttonBox}>
          <button disabled={loading} onClick={handleEditButtonClick}>update</button>
          <button disabled={loading} onClick={handleDeleteButtonClick}>delete</button>
        </div>
      )}
    </li>
  )
}
