/**
 *
 * Copyright (c) 2016-present, Total Location Test Paragraph.
 * All rights reserved.
 *
 * This file is part of Where@. Where@ is free software:
 * you can redistribute it and/or modify it under the terms of
 * the GNU General Public License (GPL), either version 3
 * of the License, or (at your option) any later version.
 *
 * Where@ is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. For more details,
 * see the full license at <http://www.gnu.org/licenses/gpl-3.0.en.html>
 *
 */

import Donation from './schema';
import { assign, flow, map, omit } from 'lodash';

export const domainFields = [
  'email',
  'name',
  'anonymous',
  'token',
  'date',
  'amount',
];

// helpers
const getDoc = d => d._doc ? d._doc : d;
const stripDbFields = d => omit(d, ['__v', '_id']);
const resolveDateField = d => assign(d, {date: new Date(d.date).toString()});
export const demongoify = flow(getDoc, stripDbFields, resolveDateField);

// main funcs
export const create = d => Donation.create(d).then(demongoify);
export const getAll = () => Donation.find({}).then(ds => ds.map(demongoify));

