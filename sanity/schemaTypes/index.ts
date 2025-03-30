import { type SchemaTypeDefinition } from 'sanity'

import {categoryType} from './categoryType'
import { productType } from './productType'
import { eventType } from './eventType'
import { committeeType } from './committeeType'
import { clubType } from './clubType'
import { memberType } from './memberType'
import { orderType } from './orderType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ categoryType,committeeType,productType, eventType ,clubType, memberType , orderType],
}
