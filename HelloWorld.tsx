import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';

import { extractListDetails } from './extractlistdetails';

export default class HelloWorld extends React.Component<IHelloWorldProps, { items: any[], selectedItem: any | null }> {
  constructor(props: IHelloWorldProps) {
    super(props);
    this.state = {
      items: [],
      selectedItem: null
    };
  }

  public async componentDidMount() {
    const listDetails = await extractListDetails();
    this.setState({
      items: listDetails
    });
  }

  private handleViewDetails = (item: any) => {
    this.setState({ selectedItem: item });
  };

  private handleCloseDetails = () => {
    this.setState({ selectedItem: null });
  };

  private getItemUrl = (itemId: number) => {
    return `https://rtuacin.sharepoint.com/sites/shivang/Lists/Alco/DispForm.aspx?ID=${itemId}`;
  };

  public render(): React.ReactElement<IHelloWorldProps> {
    const {
  
    } = this.props;

    const { items, selectedItem } = this.state;

    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <h1 className={styles.title}>Hello World</h1>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Alcono</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ID}</td>
                    <td>{item.alcono}</td>
                    <td>{item.status}</td>
                    <td>
                      <button onClick={() => this.handleViewDetails(item)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       
        </div>
        {selectedItem && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <h2>Row Details</h2>
              <p>ID: {selectedItem.ID}</p>
              <p>Alcono: {selectedItem.alcono}</p>
              <p>Status: {selectedItem.status}</p>
              <p>
                URL:{' '}
                <a href={this.getItemUrl(selectedItem.ID)} target="_blank" rel="noopener noreferrer">
                  {this.getItemUrl(selectedItem.ID)}
                </a>
              </p>
              <button onClick={this.handleCloseDetails}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
