import {styled} from '../styled'

import {Box} from './Box'
import {Card} from './Card'
import {Pos} from './Pos'
import {Lnk} from './Lnk'
import {Flex} from './Flex'
import {Typo} from './Typo'

export const BoxLnk = styled(Box)().withComponent(Lnk)
export const CardLnk = styled(Card)().withComponent(Lnk)
export const PosLnk = styled(Pos)().withComponent(Lnk)
export const FlexLnk = styled(Flex)().withComponent(Lnk)
export const TypoLnk = styled(Typo)().withComponent(Lnk)

export const BoxPos = styled(Box)().withComponent(Pos)
export const CardPos = styled(Card)().withComponent(Pos)
export const FlexPos = styled(Flex)().withComponent(Pos)

export const FlexCard = styled(Flex)().withComponent(Card)
