import SalaryDisplay from './SalaryDisplay';
import { atom, useAtom, useAtomValue } from './jotai';

export const salaryAtom = atom<number>(100_000);
export const bonusAtom = atom<number>(15_000);
const totalSalaryAtom = atom((get) => get(salaryAtom) + get(bonusAtom));

const dataAton = atom(() => fetch('/data.json').then((res) => res.json()));
const keysAtom = atom((get) => Object.keys(get(dataAton) ?? {}));

function App() {
  const [salary, setSalary] = useAtom(salaryAtom);
  const [bonus, setBonus] = useAtom(bonusAtom);
  const totalSalary = useAtomValue(totalSalaryAtom);
  const data = useAtomValue(dataAton);
  const keys = useAtomValue(keysAtom);

  return (
    <div>
      <div>
        <h1
          style={{
            color: 'blue',
            margin: '20',
          }}
        >
          Salary Atom
        </h1>
        <input
          type="number"
          value={salary as number}
          // @ts-ignore
          onChange={(e) => setSalary(Number(e.target.value))}
        />
      </div>

      <div>
        Salary:{' '}
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(salary as number)}
      </div>

      <SalaryDisplay />

      <br />

      <div>
        <h1
          style={{
            color: 'red',
            margin: '20',
          }}
        >
          Bonus Atom
        </h1>
        <input
          type="number"
          value={bonus as number}
          // @ts-ignore
          onChange={(e) => setBonus(Number(e.target.value))}
        />
      </div>

      <div>
        Salary:{' '}
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(bonus as number)}
      </div>

      <h2>Total</h2>
      <div>
        Total:{' '}
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(totalSalary as number)}
      </div>

      <div>Data: {JSON.stringify(data)}</div>
      <div>Data: {JSON.stringify(keys)}</div>
    </div>
  );
}

export default App;
