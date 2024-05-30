import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit{
  
  constructor(private contactsService: ContactsService, private productsService: ProductsService) { }
  maxStateValue: number = 0;
  maxTotalProducts: number = 0;
  legendPosition: any = 'below';
  
  initialLetter: any[] = [];
  contactsByFullName: any[] = [];
  emailExtensions: any[]= [];
  phonePrefixData: any[]= [];
  
  productsStock: any[] = [];
  productsPriceRange: any[] = [];
  productsPriceInactiveRange: any[] = [];
  stateProducts: any[] = [];
  stockProducts: any[] = [];

  colorScheme = {
    domain: ['#CFC0BB', '#7aa3e5']
  };
  // colorScheme = {
  //   domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  // };


  // minValue = 10;
  ngOnInit(): void {
    this.contactsService.getContacts().subscribe((contacts: any[]) => {
      //aqui llega la lista (array) de datos 
    
      /**
      *tabla uno guarda y calcula los datos a mostrar y despues se ordenan alfabeticamente 
      */
      this.initialLetter = this.calculateInitialLettersData(contacts);
      this.initialLetter.sort((a, b) => a.name.localeCompare(b.name));
      /**
       * segunda tabla, muestra el rango de largos de nombres
       */
      this.contactsByFullName = this.calculateContactsByFullNameData(contacts);
      /**
       * tercera tabla, seteo de datos de extensiones de email
       */
      this.emailExtensions = this.calculateEmailExtensionsData(contacts);
      /**
       * cuarta tabla, seteo de datos de extensiones de email
       */
      this.phonePrefixData = this.generatePhonePrefixData(contacts);
    });
    this.productsService.getProducts().subscribe((products: any[]) => {
      //aqui llega la lista (array) de products 
      /**
       * quinta tabla, muestra la cantidad de cada producto
       */
      this.productsStock = this.calculateProductStockData(products);
      /**
       * sexta tabla, muestra el rango de precios de los productos
       */
      this.productsPriceRange = this.calculatePriceRange(products);

      // this.stateProducts = this.productsState(products);
      this.stateProducts = this.showProductState(products);
      this.stockProducts = this.showProductStock(products);
    });
  }

  showProductStock(products: any[]): any[] {
  let activeCountStock: any = 0;
  let inactiveCountStock: any = 0;

  products.forEach(product => {
    if (product.active) {
      activeCountStock += product.stock;
      this.maxTotalProducts += product.stock;
    } else {
      inactiveCountStock += product.stock;
      this.maxTotalProducts += product.stock;
    }
  });

  return [
    {
      name: 'Stock activo',
      value: activeCountStock
    },
    {
      name: 'Stock inactivo',
      value: inactiveCountStock
    }
  ];
  }


showProductState(products: any[]): any[] {
  let activeCount = 0;
  let inactiveCount = 0;

  products.forEach(product => {
    this.maxStateValue++;
    if (product.active) {
      activeCount++;
    } else {
      inactiveCount++;
    }
  });

  return [
    {
      name: 'Productos activos',
      value: activeCount
    },
    {
      name: 'Productos inactivos',
      value: inactiveCount
    }
  ];
}

  // productsState(products: any[]): any[]{
  //   const tempProductsState= [{
  //       name: 'Products',
  //       series: 0},
  //     {
  //       name: 'InactiveProducts',
  //       series: 0
  //     }]
    
  //   var actives = 0;
  //   var inactives = 0;
  //   products.forEach(product=>{
  //     const isActive = product.active;
  //     // if (product.active){
  //     // const existingRange = tempProductsByPrice[0].series.find(item => item.price === range);
  //     // const existingRange = tempProductsByPrice[0].series.find(item => item.name === range);
  //     if(isActive){
  //       actives++;
  //       tempProductsState[0].series = actives;
  //     }else{
  //       inactives++
  //       tempProductsState[1].series = actives;
  //     }
    
  //   });
  //   return tempProductsState;
  // }

  // productsState(products: any[]): any[] {
  //   // this.maxStateValue = 
  //   const stateProduct: any[] = []; 
  //   products.forEach(product => {
  //     if(product.active){
  //       stateProduct.push({name: product.name, value: product.active});
  //     }
  //   })
  //   return stateProduct;
  // }
  // calculatePriceRange(contacts: any[]): any[]{
  //   const tempProductsByPrice= [{
  //     name: 'Products',
  //     series:<any[]> []
  //   }]
    
  //   contacts.forEach(product=>{
  //     const price = product.price;
  //     const range = `${price - (price % 5)} - ${price - (price % 5)+ 4} $.`;
  //     if (product.active){
  //     // const existingRange = tempProductsByPrice[0].series.find(item => item.price === range);
  //     const existingRange = tempProductsByPrice[0].series.find(item => item.name === range);
  //     if(existingRange){
  //       existingRange.value++;
  //     }else{
  //       tempProductsByPrice[0].series.push({name: range, value: 1})
  //     }
  //   }
  //   });
  //   // return tempProductsByPrice;
  //   return tempProductsByPrice.map(entry =>{
  //     return{
  //       ...entry,
  //       series: entry.series.sort((a,b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0]))
  //     }
  //   });
  // }

  /////////////////////////*****************////////////////////////

  // calculatePriceRange(products: any[]): any[]{
  //   const tempProductsByPrice= [{
  //       name: 'Products',
  //       series:<any[]> []},
  //     {
  //       name: 'InactiveProducts',
  //       series:<any[]> []
  //     }]
    
  //   products.forEach(product=>{
  //     const price = product.price;
  //     const range = `${price - (price % 5)} - ${price - (price % 5)+ 5} €.`;
  //     if (product.active){
  //     // const existingRange = tempProductsByPrice[0].series.find(item => item.price === range);
  //     const existingRange = tempProductsByPrice[0].series.find(item => item.name === range);
  //     if(existingRange){
  //       existingRange.value++;
  //     }else{
  //       tempProductsByPrice[0].series.push({name: range, value: 1})
  //     }
  //   }else{
  //     const existingRange = tempProductsByPrice[1].series.find(item => item.name === range);
  //     if(existingRange){
  //       existingRange.value++;
  //     }else{
  //       tempProductsByPrice[1].series.push({name: range, value: 1})
  //     }
  //   }
  //   });
  //   // return tempProductsByPrice;
  //   return tempProductsByPrice.map(entry =>{
  //     return{
  //       ...entry,
  //       series: entry.series.sort((a,b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0]))
  //     }
  //   });
  // }

  calculatePriceRange(products: any[]): any[]{
      const tempPriceRange= [{
        name: 'productos activos',
        series: <any[]>[]
      },{
        name: 'productos desactivados',
        series: <any[]>[]
      }]
      products.forEach(product=>{
        const size = product.price;
        const range = `${size -(size % 5)} - ${size - (size % 5) + 5} €.`;
        var index=0;
        if (!product.active){
          index=1;
        }
        const existingRange = tempPriceRange[index].series.find(item => item.name === range);
        if(existingRange){
          existingRange.value++;
        }else{
          tempPriceRange[index].series.push({name: range, value: 1})
        }
        if(product.active){
          //se añadio antes en tempPriceRange[0]
          //ahora se comprueba si existe en DESACTIVADO = tempPriceRange[1]
          const oppositeExist = tempPriceRange[1].series.find(item => item.name === range);
          if(!oppositeExist){//si no existe en el indice 1, o lo que es lo mismo en elproducto Desactivado
            //se añade en el producto desactivado con valor 0
            tempPriceRange[1].series.push({name: range, value: 0})
          }
        }else {
          //el valor se añadio arriba en tempPriceRange[1]
          //se comprueba si existe en ACTIVADO = tempPriceRange[0]
          const oppsiteNoExist = tempPriceRange[0].series.find(item => item.name === range);
          if(!oppsiteNoExist){//si no existe en el eindice 0, o lo que es lo mismo en el producto ACTIVADO
            //se añade en el producto activado con valor 0
            tempPriceRange[0].series.push({name: range, value: 0})
          }
        }
      });
  
      return tempPriceRange.map( entry => {
        return {
          ...entry,
          series: entry.series.sort((a,b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0]))
        }
      });
    }
    
  

  calculateProductStockData(products: any[]): any[] {
    const productsStock: any[] = []; 
    products.forEach(product => {
      if(product.active){
        productsStock.push({name: product.name, value: parseInt(product.stock)});
      }
    })
    return productsStock;
  }
  // FUNCIÓN CON map() sin los productos no activos
  // calculateProductStockData(products: any[]): any[] {
  //   //CÓDIGO EXPLICATIVO:
  //   const productosFiltrados = products.filter(product => product.active);
  //   const productosMapeados = productosFiltrados.map(product => {
  //     return {
  //     name: product.name,
  //     value: product.stock
  //     }
  //   });
  //   return productosMapeados;
    
  //CÓDIGO REFACTORIZADO Y EFICIENTE:
  // return products.filter(product => product.active).map(product => {
  //   return {
  //   name: product.name,
  //   value: product.stock
  //   };
  // });
  //}

  // calculateProductStockData(products: any[]): any[] {
  //     return products.reduce((result: any[], product) => {
  //         const productName= product.name;
  //         if(product.active){

  //           if (result.find(item => item.name === productName)) {
  //             result.find(item => item.name === productName).value++;
  //           } else {
  //             result.push({ name: productName, value: product.stock });
  //           }
  //         }
  //     return result;
  //   }, []);
  // }


  // FUNCIONES DE CONTACTOS
  generatePhonePrefixData(contacts: any[]): any[]{
    const phonePrefixdata = [];

    const prefixCounts: any = {};
    contacts.forEach(contact => {
      if(contact.telephone){
        const phonePrefix = contact.telephone.substring(0, 1);
        if(prefixCounts[phonePrefix]){
          prefixCounts[phonePrefix]++;
        }else{
          prefixCounts[phonePrefix] = 1;
        }
      }
    });
    for (const prefix in prefixCounts) {
      if(prefixCounts.hasOwnProperty(prefix)){
        phonePrefixdata.push({name: prefix, value:prefixCounts[prefix]});
      }
    }
    return phonePrefixdata;
  }

  calculateEmailExtensionsData(contacts: any[]): any[]{
    const emailExtensionMap: any = new Map<string, number>();

    contacts.forEach(contact => {
      if(contact.email){
        const emailParts = contact.email.split('@');
        if (emailParts.length === 2){
          //selecionamos el dominio es la segunda parte la 0 antes del @ la 1 es todo lo que va despues
          const domain = emailParts[1];
          const firstDotindex = domain.indexOf('.');
          if (firstDotindex !== -1){
            const extension =  domain.substring(firstDotindex);
            if(emailExtensionMap.has(extension)){
              emailExtensionMap.set(extension, emailExtensionMap.get(extension) + 1);
            }else {
              emailExtensionMap.set(extension, 1);
            }
          }
        }
      }
    })
    const emailExtensions:any[] = [];
    emailExtensionMap.forEach((value:any, key: any)=> {
      // debugger;
      emailExtensions.push({ name: key, value: value})
    })
    return emailExtensions;
  }

  calculateInitialLettersData(contacts: any[]): any[] {
    return contacts.reduce((result: any[], contact) => {
      const initial = contact.surname.charAt(0).toUpperCase();
      if (result.find(item => item.name === initial)) {
        result.find(item => item.name === initial).value++;
      } else {
        result.push({ name: initial, value: 1 });
      }
      return result;
    }, []);
  }

  calculateContactsByFullNameData(contacts: any[]): any[]{
    const tempContactsByFullName= [{
      name: 'Contacts',
      series:<any[]> []
    }]
    contacts.forEach(contact=>{
      const fullName = contact.name + contact.surname + contact.lastname;
      const size = fullName.length;
      const range = `${size - (size % 5)} - ${size - (size % 5)+ 4} ch.`;
      const existingRange = tempContactsByFullName[0].series.find(item => item.name === range);
      if(existingRange){
        existingRange.value++;
      }else{
        tempContactsByFullName[0].series.push({name: range, value: 1})
      }
    });
    return tempContactsByFullName.map(entry =>{
      return{
        ...entry,
        series: entry.series.sort((a,b) => Number(a.name.split('-')[0]) - Number(b.name.split('-')[0]))
      }
    });
  }
  
formatAxisTick(value: number){
    // return Math.floor(value).toString();
    return value.toString();
  }
formatAxisTick2(value: number){
    return Math.floor(parseInt(value.toString()));
    // return value.toString();
  }

  
}