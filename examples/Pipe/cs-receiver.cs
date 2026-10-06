using System;
using System.IO;
using System.IO.Pipes;

class PipeClient
{
    static void Main()
    {
        using (var server = new NamedPipeServerStream("examplePipe",PipeDirection.In))
        {
            server.WaitForConnection();
            using (var reader = new StreamReader(server))
            {
                string Message = reader.ReadLine();
                Console.WriteLine($"Received: {Message}");
            }
        }

    }
}
