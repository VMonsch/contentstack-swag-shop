/* eslint-disable camelcase */
import React from 'react'
import {Header, Divider, Table} from 'semantic-ui-react'

export default ({description, type, material}) => (
  <div>
    <Header as="h3">About this product</Header>
    <div dangerouslySetInnerHTML={{ __html: description }} />

    <Divider />

    <Table celled>
      <Table.Header style={{background: '#f9fafb'}}>
        <Table.Row>
          <Table.HeaderCell colSpan="2">Attributes</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>Type</Table.Cell>
          <Table.Cell>{type}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Material</Table.Cell>
          <Table.Cell>{material}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
)
