import { classifyPM25, isDataStale, normaliseOfficialHazeData } from './hazeClassifier';

function runTests() {
  console.log('--- Running Singapore Haze Classification & Normaliser Tests ---');
  let passed = 0;
  let failed = 0;

  function assert(name: string, condition: boolean) {
    if (condition) {
      console.log(`✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${name}`);
      failed++;
    }
  }

  // Test 1: Correct classification at boundary 55 and 56
  assert('55 µg/m³ is Normal', classifyPM25(55) === 'normal');
  assert('56 µg/m³ is Elevated', classifyPM25(56) === 'elevated');
  assert('0 µg/m³ is Normal', classifyPM25(0) === 'normal');

  // Test 2: Correct classification at boundary 150 and 151
  assert('150 µg/m³ is Elevated', classifyPM25(150) === 'elevated');
  assert('151 µg/m³ is High', classifyPM25(151) === 'high');

  // Test 3: Correct classification at boundary 250 and 251
  assert('250 µg/m³ is High', classifyPM25(250) === 'high');
  assert('251 µg/m³ is Very High', classifyPM25(251) === 'very-high');
  assert('350 µg/m³ is Very High', classifyPM25(350) === 'very-high');

  // Test 4: Missing values do NOT become Normal
  assert('null is unavailable', classifyPM25(null) === 'unavailable');
  assert('undefined is unavailable', classifyPM25(undefined) === 'unavailable');
  assert('NaN is unavailable', classifyPM25(NaN) === 'unavailable');
  assert('Negative number is unavailable', classifyPM25(-5) === 'unavailable');

  // Test 5: Invalid source responses handled safely
  const invalidData = normaliseOfficialHazeData(null);
  assert('Invalid payload has currentStatus = unavailable', invalidData.currentStatus === 'unavailable');
  assert('Invalid payload has sourceAvailable = false', invalidData.sourceAvailable === false);
  assert('Invalid payload has isStale = true', invalidData.isStale === true);

  // Test 6: Regional mapping
  const mockPm25 = {
    items: [
      {
        timestamp: '2026-10-17T18:00:00+08:00',
        readings: {
          pm25_one_hourly: {
            north: 45,
            south: 62,
            east: 38,
            west: 160,
            central: 50,
          },
        },
      },
    ],
  };
  const mockPsi = {
    items: [
      {
        timestamp: '2026-10-17T18:00:00+08:00',
        readings: {
          psi_twenty_four_hourly: {
            north: 50,
            south: 65,
            east: 42,
            west: 120,
            central: 55,
          },
        },
      },
    ],
  };

  const normalised = normaliseOfficialHazeData(mockPm25, mockPsi);
  assert('Regional array has 5 regions', normalised.regions.length === 5);
  const north = normalised.regions.find((r) => r.region === 'North');
  const west = normalised.regions.find((r) => r.region === 'West');
  assert('North PM2.5 mapped correctly to 45', north?.pm25 === 45);
  assert('West PM2.5 mapped correctly to 160', west?.pm25 === 160);
  assert('West PSI mapped correctly to 120', west?.psi === 120);
  assert('Highest PM2.5 is maximum regional (160)', normalised.pm25 === 160);
  assert('Classification of 160 is High', normalised.currentStatus === 'high');

  // Test 7: Source timestamp and fetched timestamp remain distinct
  assert('observedAt matches source timestamp', normalised.observedAt === '2026-10-17T18:00:00+08:00');
  assert('fetchedAt is defined and distinct', typeof normalised.fetchedAt === 'string' && normalised.fetchedAt !== normalised.observedAt);

  // Test 8: Stale data detection
  const veryOldTimestamp = new Date(Date.now() - 5 * 3600 * 1000).toISOString();
  assert('Old timestamp is marked as stale', isDataStale(veryOldTimestamp, 120) === true);
  const recentTimestamp = new Date().toISOString();
  assert('Fresh timestamp is not marked as stale', isDataStale(recentTimestamp, 120) === false);

  console.log(`\nResults: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
