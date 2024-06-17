import Link from 'next/link'
import React from 'react'

import { Container, ImageContainer } from '@/styles/pages/success'

export default function Success() {
  return (
    <Container>
      <h1>Compra efetuada!</h1>

      <ImageContainer></ImageContainer>

      <p>
        Uhuul <strong>Erick Etiene</strong>, sua{' '}
        <strong>Camiseta Beyond the Limits</strong> já está a caminho da sua
        casa.
      </p>

      <Link href={'/'}>Voltar ao catalogo</Link>
    </Container>
  )
}
