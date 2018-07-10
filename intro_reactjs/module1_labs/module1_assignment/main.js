function TransportationCompany(props) {
  return (
    <div>
      <h2>Welcome to React Transportation</h2>
      <p>The best place to buy vehicles online</p>
      <h2>Choose Options</h2>
    </div>
  )
}

function SelectType(props) {
  return (
    <option value = {props.item}>{props.item}</option>
  )
}

function VehicleOptions(props) {
  // let selectType = props.items.map(
  return (
    <div>
      New Only&nbsp;
      <input type = "checkbox" id = "coding" name = "interest" value = "coding" defaultChecked = 'checked' />
      {/*React.createElement('input', {type: 'checkbox', defaultChecked: true})*/}
      <p>
        Select Type&nbsp;
        <select>{props.items.map(vehicleType => {
          return <SelectType item = {vehicleType} />
        })}</select>
      </p>
    </div>
  )
}

function VehicleInfo(props) {
    
    return (
    <div>
      <ul>
        <table>
          <tbody>
            <tr>
              <th>Year</th>
              <th>Model</th>
              <th>Price</th>
              <th>Buy</th>
            </tr>
            <tr>
              <td>{props.item.Year}</td>
              <td>{props.item.Model}</td>
              <td>${props.item.Price}</td>
              <td>
                <button>Buy Now</button>
              </td>
            </tr>
          </tbody>
        </table>
      </ul>
    </div>
  )
}

function VehicleList(props) {
  /*let vehicleData = [];
  props.items.map((vehicleInfo) => {
   vehicleData.push(vehicleInfo);
  });*/
    
  // console.log(vehicleData);
  return (
    <div>
      <h2>{props.header}</h2>
      {props.items.map((vehicle) => {
        return <VehicleInfo item = {vehicle}/>;
      })}
    </div>
  )
}


function TransportationApp(props) {
  
  return (
    <div>
      <TransportationCompany />
      {/*{data.Type.map(type => {
        return <VehicleOptions items = {type} />;
      })}*/}
      <VehicleOptions items = {data.Type} />
      <VehicleList header = 'Cars' items = {data.Cars} />
      <VehicleList header = 'Trucks' items = {data.Trucks} />
      <VehicleList header = 'Convertibles' items = {data.Convertibles} />
    </div>
  )
}

const data = {
  "Type": ["All", "Cars", "Trucks", "Convertibles"],
  "Cars": [
    {
      "Year": 2013, "Model": "A", "Price": 32000
    },
    {
      "Year": 2011, "Model": "B", "Price": 4400
    },
    {
      "Year": 2016, "Model": "B", "Price": 15500
    }
  ],
  "Trucks": [
    {
      "Year": 2014, "Model": "D", "Price": 18000
    },
    {
      "Year": 2013, "Model": "E", "Price": 5200
    }
  ],
  "Convertibles": [
    {
      "Year": 2009, "Model": "F", "Price": 2000
    },
    {
      "Year": 2010, "Model": "G", "Price": 6000
    },
    {
      "Year": 2012, "Model": "H", "Price": 12500
    },
    {
      "Year": 2017, "Model": "M", "Price": 50000
    }
  ]
};

ReactDOM.render(
  <TransportationApp />,
  document.getElementById('root')
)