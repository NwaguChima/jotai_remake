import { salaryAtom } from './App';
import { useAtomValue } from './jotai';

function SalaryDisplay() {
  //   const [salary] = useAtom(salaryAtom);
  const salary = useAtomValue(salaryAtom);

  return (
    <div>
      Salary:{' '}
      {new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(salary)}
    </div>
  );
}

export default SalaryDisplay;
