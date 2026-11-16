/** Dolch lists are public domain. CVC and phonics lists are original short word banks. */

export const DOLCH_PREK = [
  'a', 'and', 'away', 'big', 'blue', 'can', 'come', 'down', 'find', 'for', 'funny', 'go', 'help', 'here',
  'I', 'in', 'is', 'it', 'jump', 'little', 'look', 'make', 'me', 'my', 'not', 'one', 'play', 'red', 'run',
  'said', 'see', 'the', 'three', 'to', 'two', 'up', 'we', 'where', 'yellow', 'you',
]

export const DOLCH_G1 = [
  'after', 'again', 'an', 'any', 'as', 'ask', 'by', 'could', 'every', 'fly', 'from', 'give', 'going', 'had',
  'has', 'her', 'him', 'his', 'how', 'just', 'know', 'let', 'live', 'may', 'of', 'old', 'once', 'open', 'over',
  'put', 'round', 'some', 'stop', 'take', 'thank', 'them', 'then', 'think', 'walk', 'were', 'when',
]

export const DOLCH_G2 = [
  'always', 'around', 'because', 'been', 'before', 'best', 'both', 'buy', 'call', 'cold', 'does', "don't",
  'fast', 'first', 'five', 'found', 'gave', 'goes', 'green', 'its', 'made', 'many', 'off', 'or', 'pull', 'read',
  'right', 'sing', 'sit', 'sleep', 'tell', 'their', 'these', 'those', 'upon', 'us', 'use', 'very', 'wash',
  'which', 'why', 'wish', 'work', 'would', 'write', 'your',
]

export const CVC = [
  'cat', 'hat', 'bat', 'mat', 'sat', 'cap', 'map', 'nap', 'sad', 'mad', 'bag', 'rag',
  'bed', 'red', 'hen', 'pen', 'ten', 'net', 'wet', 'leg',
  'sit', 'pin', 'win', 'big', 'pig', 'dig', 'lid', 'rip',
  'hop', 'pot', 'top', 'dog', 'log', 'hot', 'mop', 'box',
  'sun', 'run', 'cup', 'bus', 'bug', 'cut', 'nut', 'rug',
]

export const SHORT_A = ['cat', 'hat', 'map', 'bag', 'sad', 'cap', 'jam', 'fan']
export const SHORT_E = ['bed', 'red', 'hen', 'pen', 'ten', 'net', 'wet', 'leg']
export const SHORT_I = ['sit', 'pin', 'win', 'big', 'pig', 'lid', 'rip', 'sip']
export const SHORT_O = ['hop', 'pot', 'top', 'dog', 'log', 'hot', 'mop', 'box']
export const SHORT_U = ['sun', 'run', 'cup', 'bus', 'bug', 'cut', 'nut', 'rug']
export const SHORT = { a: SHORT_A, e: SHORT_E, i: SHORT_I, o: SHORT_O, u: SHORT_U }

export const LONG = {
  a: ['cake', 'gate', 'name', 'rain', 'play', 'day', 'tape', 'sail'],
  e: ['bee', 'seed', 'tree', 'leaf', 'meat', 'keep', 'feet', 'beach'],
  i: ['bike', 'kite', 'time', 'night', 'light', 'pie', 'ride', 'five'],
  o: ['home', 'rope', 'boat', 'coat', 'snow', 'road', 'hope', 'note'],
  u: ['flute', 'tune', 'fruit', 'blue', 'glue', 'cube', 'mule', 'suit'],
}

export const DIGRAPHS: { letters: string; words: string[] }[] = [
  { letters: 'sh', words: ['ship', 'shop', 'fish', 'shell', 'brush', 'shoe'] },
  { letters: 'ch', words: ['chip', 'chop', 'chair', 'lunch', 'chin', 'beach'] },
  { letters: 'th', words: ['this', 'that', 'thin', 'path', 'math', 'bath'] },
  { letters: 'wh', words: ['when', 'whip', 'wheel', 'white', 'whale', 'which'] },
]

export const BLENDS: { letters: string; words: string[] }[] = [
  { letters: 'bl', words: ['blue', 'black', 'block', 'blow', 'blink'] },
  { letters: 'br', words: ['brown', 'bring', 'brush', 'brick', 'brave'] },
  { letters: 'cl', words: ['clap', 'clip', 'clock', 'cloud', 'climb'] },
  { letters: 'cr', words: ['crab', 'crop', 'crib', 'cry', 'crack'] },
  { letters: 'fl', words: ['flag', 'flip', 'flat', 'fly', 'flame'] },
  { letters: 'fr', words: ['frog', 'from', 'fresh', 'frame', 'frost'] },
  { letters: 'gr', words: ['green', 'grab', 'grass', 'grin', 'grape'] },
  { letters: 'pl', words: ['plan', 'plum', 'play', 'plus', 'plant'] },
  { letters: 'sl', words: ['sled', 'slip', 'slam', 'slow', 'sleep'] },
  { letters: 'st', words: ['stop', 'step', 'star', 'stick', 'stamp'] },
  { letters: 'tr', words: ['tree', 'trip', 'trap', 'train', 'truck'] },
]

export const RHYME_SETS: { word: string; rhyme: string; foil: string }[] = [
  { word: 'cat', rhyme: 'hat', foil: 'cup' },
  { word: 'dog', rhyme: 'log', foil: 'dig' },
  { word: 'sun', rhyme: 'run', foil: 'sit' },
  { word: 'bed', rhyme: 'red', foil: 'bad' },
  { word: 'cake', rhyme: 'lake', foil: 'coat' },
  { word: 'tree', rhyme: 'bee', foil: 'tray' },
  { word: 'light', rhyme: 'night', foil: 'late' },
  { word: 'hop', rhyme: 'top', foil: 'hat' },
  { word: 'pen', rhyme: 'ten', foil: 'pan' },
  { word: 'car', rhyme: 'star', foil: 'corn' },
  { word: 'blue', rhyme: 'glue', foil: 'black' },
  { word: 'king', rhyme: 'ring', foil: 'kite' },
]

export const SYN: { word: string; syn: string; ant: string }[] = [
  { word: 'happy', syn: 'glad', ant: 'sad' },
  { word: 'big', syn: 'large', ant: 'small' },
  { word: 'fast', syn: 'quick', ant: 'slow' },
  { word: 'smart', syn: 'clever', ant: 'foolish' },
  { word: 'quiet', syn: 'silent', ant: 'loud' },
  { word: 'begin', syn: 'start', ant: 'end' },
  { word: 'near', syn: 'close', ant: 'far' },
  { word: 'angry', syn: 'mad', ant: 'calm' },
  { word: 'brave', syn: 'bold', ant: 'afraid' },
  { word: 'cold', syn: 'chilly', ant: 'hot' },
  { word: 'easy', syn: 'simple', ant: 'hard' },
  { word: 'gift', syn: 'present', ant: 'loss' },
]

export const POS_ITEMS: { sentence: string; word: string; pos: 'noun' | 'verb' | 'adjective' }[] = [
  { sentence: 'The happy dog runs in the park.', word: 'happy', pos: 'adjective' },
  { sentence: 'The happy dog runs in the park.', word: 'dog', pos: 'noun' },
  { sentence: 'The happy dog runs in the park.', word: 'runs', pos: 'verb' },
  { sentence: 'A small bird sings a song.', word: 'small', pos: 'adjective' },
  { sentence: 'A small bird sings a song.', word: 'bird', pos: 'noun' },
  { sentence: 'A small bird sings a song.', word: 'sings', pos: 'verb' },
  { sentence: 'Cold rain fell on the street.', word: 'Cold', pos: 'adjective' },
  { sentence: 'Cold rain fell on the street.', word: 'rain', pos: 'noun' },
  { sentence: 'Cold rain fell on the street.', word: 'fell', pos: 'verb' },
  { sentence: 'Those green apples taste sweet.', word: 'green', pos: 'adjective' },
  { sentence: 'Those green apples taste sweet.', word: 'apples', pos: 'noun' },
  { sentence: 'Those green apples taste sweet.', word: 'taste', pos: 'verb' },
  { sentence: 'The careful painter covers the wall.', word: 'careful', pos: 'adjective' },
  { sentence: 'The careful painter covers the wall.', word: 'painter', pos: 'noun' },
  { sentence: 'The careful painter covers the wall.', word: 'covers', pos: 'verb' },
]

export const CAP_ITEMS: { raw: string; fixed: string }[] = [
  { raw: 'the dog ran to sam on friday', fixed: 'The dog ran to Sam on Friday.' },
  { raw: 'did mia go to the park', fixed: 'Did Mia go to the park?' },
  { raw: 'we will visit texas in july', fixed: 'We will visit Texas in July.' },
  { raw: 'mr lee reads a book', fixed: 'Mr. Lee reads a book.' },
  { raw: 'stop that ball', fixed: 'Stop that ball!' },
  { raw: 'on monday noah walked home', fixed: 'On Monday Noah walked home.' },
  { raw: 'where is lila going', fixed: 'Where is Lila going?' },
  { raw: 'my friend jules lives in ohio', fixed: 'My friend Jules lives in Ohio.' },
  { raw: 'can owen help us', fixed: 'Can Owen help us?' },
  { raw: 'the class meets in april', fixed: 'The class meets in April.' },
  { raw: 'priya said she was ready', fixed: 'Priya said she was ready.' },
  { raw: 'look at the moon', fixed: 'Look at the moon!' },
]

export type Passage = { text: string; question: string; answer: string }

export const PASSAGES: Record<'1' | '2' | '3' | '4' | '5', Passage[]> = {
  '1': [
    { text: 'The sun is up. Sam has a red cap. He runs to the bus stop and waves.', question: 'What color is Sam’s cap?', answer: 'red' },
    { text: 'A tan cat sits on a mat. The cat has a nap in the sun. It does not run.', question: 'Where does the cat sit?', answer: 'on a mat' },
    { text: 'Mia has six red apples in a bag. She gives two apples to a friend. The rest stay in the bag.', question: 'How many apples did Mia give away?', answer: '2' },
    { text: 'The hen is in the yard. She has three little chicks. The chicks eat corn.', question: 'How many chicks does the hen have?', answer: '3' },
    { text: 'Leo kicks a ball to Ava. The ball rolls under a bench. Ava looks under the bench to find it.', question: 'Where does the ball roll?', answer: 'under a bench' },
    { text: 'It is a wet day. Noor puts on a yellow coat. She jumps in a puddle and laughs.', question: 'What color is Noor’s coat?', answer: 'yellow' },
    { text: 'Owen has a new book. He reads it on the rug. The book is about a boat.', question: 'What is the book about?', answer: 'a boat' },
    { text: 'The class plants seeds in cups. They water the seeds each day. Green shoots come up in a week.', question: 'What comes up in a week?', answer: 'green shoots' },
    { text: 'Priya packs a lunch. She puts in bread, an apple, and a cup of milk. She sits under a tree to eat.', question: 'Where does Priya sit to eat?', answer: 'under a tree' },
    { text: 'A little frog is by the pond. It hops onto a log. Then it hops back into the water.', question: 'Where is the frog at the start?', answer: 'by the pond' },
  ],
  '2': [
    { text: 'Jules walks to the library after school. He chooses a book about the moon and sits by the window to read. When the librarian says it is almost closing time, Jules checks the book out and tucks it into his bag.', question: 'What is Jules’s book about?', answer: 'the moon' },
    { text: 'The class is making a garden. Lila digs holes, and Noor drops in bean seeds. They water the dirt and make a sign that says “Bean Patch.” The next week, tiny leaves peek out of the soil.', question: 'What kind of seeds do they plant?', answer: 'bean seeds' },
    { text: 'On Saturday, Ava’s family goes to the farmer’s market. Ava smells fresh bread and counts six yellow squashes at one stall. Her dad buys two, and Ava carries them in a paper bag.', question: 'How many squashes does Ava’s dad buy?', answer: '2' },
    { text: 'The soccer game starts at ten. Mia ties her shoes and runs onto the field. She passes the ball to a teammate, who kicks it into the net. The crowd cheers.', question: 'What time does the game start?', answer: 'ten' },
    { text: 'Snow falls all morning. Owen and Sam build a small snow wall in the yard. When their hands get cold, they go inside for cocoa and look out the window at their work.', question: 'Why do Owen and Sam go inside?', answer: 'their hands get cold' },
    { text: 'Priya’s class takes a trip to the fire station. A firefighter shows them the long hose and the tall ladder. Priya asks how the alarm works, and the firefighter lets her press a quiet practice button.', question: 'Where does the class go?', answer: 'the fire station' },
    { text: 'The pond is still in the evening. Noah sees a turtle slide off a rock and into the water. He waits, and the turtle’s head comes up again near the reeds.', question: 'What does the turtle slide off?', answer: 'a rock' },
    { text: 'Lila writes a letter to her cousin. She tells about her new puppy and draws a picture at the bottom. She folds the paper, puts it in an envelope, and asks her mom for a stamp.', question: 'What does Lila draw on the letter?', answer: 'a picture' },
  ],
  '3': [
    { text: 'Every Thursday, the third-grade class visits the school garden. This week they measure the tomato plants and find that one vine has grown four inches since last time. They pick the ripe red tomatoes and leave the green ones to ripen. Back in the classroom, they write the new heights on a chart.', question: 'How much has one vine grown since last time?', answer: 'four inches' },
    { text: 'Sam was nervous about the talent show. He had practiced a short piano piece every afternoon for two weeks. When his name was called, he sat on the bench, took a slow breath, and played the song from start to finish. The room was quiet until the last note, and then people clapped.', question: 'What instrument does Sam play?', answer: 'piano' },
    { text: 'The town library is starting a Saturday bird walk. Ava signs up and borrows a small guidebook. On the walk, the leader points out a red bird in a pine tree and asks the group to listen before they speak. Ava hears a high call and finds the bird on the page labeled “cardinal.”', question: 'What bird does Ava identify?', answer: 'cardinal' },
    { text: 'Noah’s science group tests which paper airplane flies farthest. They fold three planes the same way, then change the wing width on only one of them. In the hallway they launch each plane twice and record the distance. The plane with the wider wings goes the farthest on both tries.', question: 'Which plane flies farthest?', answer: 'the one with wider wings' },
    { text: 'After a storm, the creek behind the school runs faster than usual. Ms. Patel takes the class to a safe overlook and asks them to sketch what they see. Leaves and a small branch race by. The next day the water is lower, and the branch is caught on a rock mid-stream.', question: 'Where do they watch the creek from?', answer: 'a safe overlook' },
    { text: 'Jules wants to learn a new jump-rope rhyme. He asks an older student to teach him the words and practices at recess until he can keep the rope turning. On Friday he teaches the rhyme to two friends, and the three of them take turns jumping.', question: 'When does Jules teach the rhyme to his friends?', answer: 'Friday' },
    { text: 'The class is writing invitations to a poetry reading. Priya checks that each note has a date, a time, and a place. She notices one invitation is missing the time, so she adds “2:00 in the afternoon” before the notes go home.', question: 'What was missing from one invitation?', answer: 'the time' },
  ],
  '4': [
    { text: 'The fourth-grade debate team is preparing an argument about whether the school should start a compost bin. Mia gathers facts about how much lunch waste the cafeteria throws out each week. She also interviews the cook, who already sets aside vegetable scraps for a garden. In practice, Mia leads with the number of bags of waste and then explains how the cook’s scraps could become soil for the same garden.', question: 'What does Mia interview the cook about?', answer: 'vegetable scraps for a garden' },
    { text: 'On a field trip to a local history museum, the class studies a display of letters written by children during a flood one hundred years ago. One letter describes carrying books to an upstairs room so they would stay dry. Owen copies a sentence into his notebook and later compares it with a newspaper photo of the same street under water.', question: 'Why were the books carried upstairs?', answer: 'so they would stay dry' },
    { text: 'Lila is timing her mile run each Friday. The first week she finishes in ten minutes and twenty seconds. She shortens her stride and practices on the weekend. By the fourth Friday she is forty seconds faster, and she charts the times so she can see the change.', question: 'How much faster is Lila by the fourth Friday?', answer: 'forty seconds' },
    { text: 'A visiting astronomer sets up a small telescope on the playground after dusk. Students take turns looking at the moon’s craters. The astronomer explains that the dark patches are not seas of water, even though they have old names that sound like oceans. Noor sketches a crater and labels the dark patch she saw.', question: 'What does the astronomer say the dark patches are not?', answer: 'seas of water' },
    { text: 'The student council wants a quieter hallway between classes. They try two ideas for one week each: teachers standing at classroom doors, and a painted line down the center of the hall. They tally how often a class has to be asked to lower voices. The painted line week has fewer reminders, so they vote to keep the line and add signs at the corners.', question: 'Which idea led to fewer reminders?', answer: 'the painted line' },
    { text: 'Sam is writing a report on a nearby river. He reads that the river was once used to float logs to a mill, and that a dam later changed how fish moved upstream. On a walk with his class, he sees a fish ladder beside the dam and writes a paragraph about why it was added.', question: 'What does Sam see beside the dam?', answer: 'a fish ladder' },
  ],
  '5': [
    { text: 'The fifth-grade weather team keeps a log of wind speed and rainfall for a month. In the third week a storm drops more rain in one night than the three weeks before it combined. The team compares their numbers with a report from a city station two miles away and finds the school measured a slightly higher total, which they think is because the school sits at the bottom of a small hill. They present both sets of numbers and their idea about the hill, and they label the idea as a possible explanation, not a proven fact.', question: 'Why do they think the school measured more rain than the city station?', answer: 'the school sits at the bottom of a small hill' },
    { text: 'Priya is adapting a short folktale into a ten-minute play. She cuts a long journey down to two scenes and gives a quiet character a few more lines so the audience can understand a choice that was only described in the original story. At rehearsal, the actor playing that character asks why the lines were added. Priya reads the original paragraph and shows how the new lines keep the same reason for the choice, just in spoken form.', question: 'Why does Priya add lines for the quiet character?', answer: 'so the audience can understand a choice' },
    { text: 'A maker club is building a small ramp to test how surface material changes the distance a marble rolls. They try felt, sandpaper, and a smooth board, releasing the marble from the same height each time. The smooth board sends the marble farthest, and sandpaper stops it soonest. The group writes that a rougher surface creates more friction, and they note they would like to test a wet board next, because they have not yet collected data on that.', question: 'Which surface sends the marble farthest?', answer: 'the smooth board' },
    { text: 'During a unit on civic life, the class attends a town meeting about a proposed path along the creek. Some speakers worry about litter; others want a safe place to walk. Ava takes notes on both sides and, back at school, drafts a letter that summarizes the concerns without saying which side she prefers. Her teacher asks her to add one sentence that states her own recommendation, so Ava writes that a path with clearly marked trash bins could address both safety and litter.', question: 'What does Ava recommend in her letter?', answer: 'a path with clearly marked trash bins' },
    { text: 'Jules is researching how a nearby lighthouse was kept running before electric lines reached the coast. He learns that keepers carried oil up a spiral stair and had to trim a wick on a strict schedule. A diary entry from 1891 mentions a storm that lasted two days, during which the keeper did not leave the lantern room except to bring more oil. Jules uses that entry as evidence that the work was demanding, not as proof of every storm that year.', question: 'What did the keeper carry up the stairs?', answer: 'oil' },
    { text: 'The school’s chess club starts a lunchtime ladder. Players may challenge someone one or two places above them, and the winner takes the higher spot. After three weeks, Noor has moved from twelfth to fourth, mostly by winning endgames she used to rush. She tells a younger player that slowing down on the last ten moves helped more than memorizing opening names, and she offers to review one endgame together the next day.', question: 'How far has Noor moved on the ladder after three weeks?', answer: 'from twelfth to fourth' },
  ],
}
