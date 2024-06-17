import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'
import { Container, Product } from '@/styles/pages/home'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <Container ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Product
          href={`/product/${product.id}`}
          key={product.id}
          className="keen-slider__slide"
        >
          <Image src={product.imageUrl} width={520} height={480} alt="" />

          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
      ))}
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'], // para incluir as propriedades do preço
  })

  const products = response.data.map((product) => {
    const productPrice = product.default_price as Stripe.Price

    const price = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(productPrice.unit_amount! / 100)

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price,
    }
  })

  return {
    props: {
      products,
    },

    // tempo em segundos que eu quero que a pagina seja recriada
    revalidate: 60 * 60 * 2, // 2 horas
  }
}
