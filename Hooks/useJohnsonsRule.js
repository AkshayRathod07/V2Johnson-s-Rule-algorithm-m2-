import React from 'react'

const useJohnsonsRule = () => {

    function johnsonsRule(jobs) {
        const n = jobs.length;
        const sequence = Array(n).fill(null); //creating empty array n length

        console.log('n', n);

        // Sort jobs based on processing time for Machine M1 and M2
        jobs.sort((a, b) => Math.min(a.M1, a.M2) - Math.min(b.M1, b.M2));
        console.log('jobs', jobs);
        let leftIndex = 0;
        let rightIndex = n - 1;

        for (let i = 0; i < n; i++) {
            if (jobs[i].M1 < jobs[i].M2) {
                sequence[leftIndex++] = jobs[i].job;
            } else {
                sequence[rightIndex--] = jobs[i].job;
            }
        }

        console.log('sequence', sequence);
        return sequence;
    }
    return {
        johnsonsRule
    }
}

export default useJohnsonsRule;