import { Check, X } from 'tabler-icons-react';

const SolutionsTable = () => {
  const StyledX = () => {
    return (
      <X style={{ color: '#541594' }} size='36' />
    )
  }

  const StyledCheck = () => {
    return (
      <Check style={{ color: '#0CBAFF' }} size='36' />
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Pact</th>
          <th>PactFlow</th>
          <th>Karate</th>
          <th>Specmatic</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Spec-driven</th>
          <td><StyledX /></td>
          <td><StyledCheck /></td>
          <td><StyledX /></td>
          <td><StyledCheck /></td>
        </tr>
        <tr>
          <th>Open-source</th>
          <td><StyledCheck /></td>
          <td><StyledX /></td>
          <td><StyledCheck /></td>
          <td><StyledCheck /></td>
        </tr>
        <tr>
          <th>Managed</th>
          <td><StyledX /></td>
          <td><StyledCheck /></td>
          <td><StyledX /></td>
          <td><StyledX /></td>
        </tr>
        <tr>
          <th>Easy to Adopt</th>
          <td><StyledX /></td>
          <td><StyledX /></td>
          <td><StyledX /></td>
          <td><StyledCheck /></td>
        </tr>
        <tr>
          <th>Broker</th>
          <td><StyledCheck /></td>
          <td><StyledCheck /></td>
          <td><StyledX /></td>
          <td><StyledX /></td>
        </tr>
      </tbody>
    </table>
  )
}

export default SolutionsTable;
