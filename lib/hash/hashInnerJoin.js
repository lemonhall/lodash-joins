import groupBy from 'lodash/groupBy';
import has from 'lodash/has';
import map from 'lodash/map';
import reduceRight from 'lodash/reduceRight';

/**
 * Hash inner join
 * @param  {Array<Object>} a
 * @param  {AccessorFunction} aAccessor
 * @param  {Array<Object>} b
 * @param  {AccessorFunction} bAccessor
 * @param  {MergerFunction} merger
 * @returns {Array<Object>}
 */
export default function hashInnerJoin (a, aAccessor, b, bAccessor, merger) {
    if (a.length < 1 || b.length < 1) {
        return [];
    }
    let index,
        value;
    if (a.length < b.length) {
        index = groupBy(a, aAccessor);
        return reduceRight(b, (previous, bDatum) => {
            value = bAccessor(bDatum);
            if (has(index, value)) {
                return map(index[value], aDatum => merger(aDatum, bDatum)).concat(previous);
            }
            return previous;
        }, []);
    }
    index = groupBy(b, bAccessor);
    return reduceRight(a, (previous, aDatum) => {
        value = aAccessor(aDatum);
        if (has(index, value)) {
            return map(index[value], bDatum => merger(aDatum, bDatum)).concat(previous);
        }
        return previous;
    }, []);
}
