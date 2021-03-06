import hashLeftAntiJoin from '../lib/hash/hashLeftAntiJoin';
import sortedMergeLeftAntiJoin from '../lib/sortedMerge/sortedMergeLeftAntiJoin';
import nestedLoopLeftAntiJoin from '../lib/nestedLoop/nestedLoopLeftAntiJoin';
import joinBench from './util/joinBench';

export default joinBench('Left Anti Joins Small', 10, hashLeftAntiJoin,
    sortedMergeLeftAntiJoin, nestedLoopLeftAntiJoin);
