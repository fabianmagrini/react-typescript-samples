import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json();

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      const response: ApiResponse<null> = {
        data: null,
        success: false,
        message: 'All fields are required'
      };
      return NextResponse.json(response, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const response: ApiResponse<null> = {
        data: null,
        success: false,
        message: 'Invalid email format'
      };
      return NextResponse.json(response, { status: 400 });
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    const response: ApiResponse<{ id: string }> = {
      data: { id: Date.now().toString() },
      success: true,
      message: 'Message sent successfully. We will get back to you soon!'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Contact form error:', error);
    
    const response: ApiResponse<null> = {
      data: null,
      success: false,
      message: 'Failed to send message. Please try again later.'
    };

    return NextResponse.json(response, { status: 500 });
  }
}