// Define job processing times
// const jobs = [
//     { name: 'A', M1: 3, M2: 13 },
//     { name: 'B', M1: 5, M2: 7 },
//     { name: 'C', M1: 9, M2: 8 },
//     { name: 'D', M1: 11, M2: 2 },
//     { name: 'E', M1: 10, M2: 10 },
//     { name: 'F', M1: 6, M2: 5 },
//     { name: 'G', M1: 8, M2: 9 },
//     { name: 'H', M1: 7, M2: 4 },
//     { name: 'I', M1: 11, M2: 12 },
// ];
const jobs = [
    { name: '1', M1: 6, M2: 3 },
    { name: '2', M1: 2, M2: 7 },
    { name: '3', M1: 10, M2: 8 },
    { name: '4', M1: 4, M2: 9 },
    { name: '5', M1: 11, M2: 5 },
];

// Function to find job sequence using Johnson's Rule
function johnsonsRule(jobs) {
    const n = jobs.length;
    const sequence = Array(n).fill(null); //creating empty array n length


    // Sort jobs based on processing time for Machine M1 and M2
    jobs.sort((a, b) => Math.min(a.M1, a.M2) - Math.min(b.M1, b.M2));
    console.log('jobs', jobs);
    let leftIndex = 0;
    let rightIndex = n - 1;

    for (let i = 0; i < n; i++) {
        if (jobs[i].M1 < jobs[i].M2) {
            sequence[leftIndex++] = jobs[i].name;
        } else {
            sequence[rightIndex--] = jobs[i].name;
        }
    }

    return sequence;
}

// Calculate completion times for each job
const jobSequence = johnsonsRule(jobs);

// Display the correct job sequence
console.log('Job Sequence:', jobSequence);


// Function to calculate idle time and percentage utilization
// function calculateIdleTimeAndUtilization(jobs, sequence) {
//     const n = jobs.length;
//     let elapsed = 0;
//     let idleM1 = 0;
//     let idleM2 = 0;

//     // Calculate completion time for Machine M1
//     let completionTimeM1 = 0;
//     for (let i = 0; i < n; i++) {
//         const currentJob = jobs.find(job => job.name === sequence[i]);
//         completionTimeM1 += currentJob.M1;
//         elapsed = Math.max(elapsed, completionTimeM1);
//         idleM1 = elapsed - completionTimeM1;
//     }

//     // Calculate completion time for Machine M2
//     let completionTimeM2 = elapsed;
//     for (let i = n - 1; i >= 0; i--) {
//         const currentJob = jobs.find(job => job.name === sequence[i]);
//         completionTimeM2 += currentJob.M2;
//         elapsed = Math.max(elapsed, completionTimeM2);
//         idleM2 = elapsed - completionTimeM2;
//     }

//     // Calculate percentage utilization
//     const utilizationM1 = ((elapsed - idleM1) / elapsed) * 100;
//     const utilizationM2 = ((elapsed - idleM2) / elapsed) * 100;

//     return { elapsed, idleM1, idleM2, utilizationM1, utilizationM2 };
// }

// Calculate idle time and percentage utilization
// const results = calculateIdleTimeAndUtilization(jobs, jobSequence);

// Display the results
// console.log('Minimum Elapsed Time:', results.elapsed, 'minutes');
// console.log('Idle Time for Machine M1:', results.idleM1, 'minutes');
// console.log('Idle Time for Machine M2:', results.idleM2, 'minutes');
// console.log('Percentage Utilization of Machine M1:', results.utilizationM1.toFixed(2) + '%');
// console.log('Percentage Utilization of Machine M2:', results.utilizationM2.toFixed(2) + '%');
